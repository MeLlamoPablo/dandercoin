import { validate } from 'class-validator';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

export function validatedHandler<T>(
  PayloadClass: { new (): T },
  handler: (
    payload: T,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void> | void,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const payload = Object.assign({}, req.body) as T;
      Object.setPrototypeOf(payload, Object.getPrototypeOf(new PayloadClass()));

      const errors = await validate(
        (payload as unknown) as Record<string, unknown>,
      );

      if (errors.length > 0) {
        res.status(400).json({ code: 'VALIDATION_ERROR', errors });
      } else {
        await handler(payload, req, res, next);
      }
    } catch (e) {
      next(e);
    }
  };
}
