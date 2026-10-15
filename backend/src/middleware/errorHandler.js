import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function errorHandler(err, req, res, next) {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const issues = err.issues || err.errors || [];
    const formattedErrors = issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  // 2. Prisma Database Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'The requested record was not found',
      });
    }

    // Unique constraint violation (e.g. email)
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A record with this unique value already exists',
      });
    }
  }

  // 3. Malformed JSON Body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload in request body',
    });
  }

  // 4. Default Internal Server Error
  console.error('[Internal Server Error]', err);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
}
