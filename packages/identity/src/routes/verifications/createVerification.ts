import { IsEmail } from 'class-validator';
import type { RequestHandler } from 'express';

import { sendEmail } from '$/utils/email';
import { generateToken } from '$/utils/db';
import { validatedHandler } from '$/utils/validation';

class Payload {
  @IsEmail()
  email: string;
}

const handler: RequestHandler = validatedHandler(
  Payload,
  async (payload, _, res) => {
    const token = await generateToken(payload.email);

    await sendEmail({
      to: payload.email,
      token,
    });

    res.status(200).send();
  },
);

export default handler;
