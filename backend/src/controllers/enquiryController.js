import { prisma } from '../lib/prisma.js';
import { 
  createEnquirySchema, 
  updateEnquirySchema, 
  enquiryQuerySchema 
} from '../validators/enquirySchema.js';
import { notifyNewEnquiry } from '../services/whatsappService.js';
import { sendNewEnquiryEmail } from '../services/emailService.js';
import { sendTelegramNotification } from '../services/telegramService.js';

/**
 * Public Endpoint: Create a new customer enquiry
 * Saves to PostgreSQL and triggers non-blocking WhatsApp & Email alerts
 */
export async function createEnquiry(req, res, next) {
  try {
    const validatedData = createEnquirySchema.parse(req.body);

    const fullAddress = [
      validatedData.unitNo,
      validatedData.society,
      validatedData.locality,
    ].filter(Boolean).join(', ');

    const newEnquiry = await prisma.enquiry.create({
      data: {
        parentName: validatedData.parentName,
        phone: validatedData.phone,
        babyAgeGroup: validatedData.babyAgeGroup,
        preferredDate: new Date(validatedData.preferredDate),
        unitNo: validatedData.unitNo,
        society: validatedData.society,
        locality: validatedData.locality,
        address: fullAddress,
        additionalMessage: validatedData.additionalMessage || null,
        status: 'NEW',
      },
    });

    // Send immediate 201 response so user sees the confirmation screen instantly
    res.status(201).json({
      success: true,
      message: 'Enquiry received successfully. We will contact you within 24 hours.',
      data: {
        id: newEnquiry.id,
        parentName: newEnquiry.parentName,
        phone: newEnquiry.phone,
        babyAgeGroup: newEnquiry.babyAgeGroup,
        preferredDate: newEnquiry.preferredDate,
        locality: newEnquiry.locality,
        createdAt: newEnquiry.createdAt,
      },
    });

    // Fire WhatsApp notification asynchronously in background
    notifyNewEnquiry(newEnquiry).catch((err) => {
      console.error('[WhatsApp Background Error]', err);
    });

    // Fire Email notification to official owner asynchronously in background
    sendNewEnquiryEmail(newEnquiry).catch((err) => {
      console.error('[Email Notification Error]', err);
    });

    // Fire Telegram notification asynchronously in background
    sendTelegramNotification(newEnquiry).catch((err) => {
      console.error('[Telegram Notification Error]', err);
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin Endpoint: List enquiries with pagination, status filter, and search
 */
export async function getEnquiries(req, res, next) {
  try {
    const { page, limit, status, q } = enquiryQuerySchema.parse(req.query);

    const where = {};

    if (status) {
      where.status = status;
    }

    if (q) {
      where.OR = [
        { parentName: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { society: { contains: q, mode: 'insensitive' } },
        { locality: { contains: q, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [total, enquiries] = await Promise.all([
      prisma.enquiry.count({ where }),
      prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin Endpoint: Retrieve a single enquiry by UUID
 */
export async function getEnquiryById(req, res, next) {
  try {
    const { id } = req.params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin Endpoint: Update status or internal notes for an enquiry
 */
export async function updateEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    const validatedData = updateEnquirySchema.parse(req.body);

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(validatedData.status && { status: validatedData.status }),
        ...(validatedData.internalNotes !== undefined && {
          internalNotes: validatedData.internalNotes,
        }),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin Endpoint: Delete an enquiry
 */
export async function deleteEnquiry(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.enquiry.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
