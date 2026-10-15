import { z } from 'zod';

export const createEnquirySchema = z.object({
  parentName: z
    .string({ required_error: "Parent's name is required" })
    .trim()
    .min(1, "Parent's name is required")
    .max(100, "Parent's name cannot exceed 100 characters"),
  
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(6, 'Phone number must be at least 6 digits')
    .max(25, 'Phone number cannot exceed 25 characters'),

  babyAgeGroup: z
    .string({ required_error: "Baby's age group is required" })
    .trim()
    .min(1, 'Age group is required')
    .max(50, 'Age group text too long'),

  preferredDate: z
    .string({ required_error: 'Preferred date is required' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format (must be YYYY-MM-DD)',
    }),

  unitNo: z
    .string()
    .trim()
    .max(100, 'Unit number cannot exceed 100 characters')
    .optional()
    .nullable()
    .default(''),

  society: z
    .string()
    .trim()
    .max(150, 'Society name cannot exceed 150 characters')
    .optional()
    .nullable()
    .default(''),

  locality: z
    .string({ required_error: 'Locality in Indore is required' })
    .trim()
    .min(1, 'Locality is required')
    .max(150, 'Locality cannot exceed 150 characters'),

  additionalMessage: z
    .string()
    .trim()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional()
    .nullable()
    .or(z.literal('')),
});

export const updateEnquirySchema = z.object({
  status: z
    .enum(['NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], {
      errorMap: () => ({ message: 'Invalid enquiry status' }),
    })
    .optional(),
  
  internalNotes: z
    .string()
    .max(2000, 'Internal notes cannot exceed 2000 characters')
    .optional()
    .nullable(),
});

export const enquiryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z
    .enum(['NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'])
    .optional(),
  q: z.string().trim().optional(),
});
