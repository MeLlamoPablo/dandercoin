import { IsString, MaxLength, MinLength } from 'class-validator';
import type { RequestHandler } from 'express';

import { consumeToken } from '$/utils/db';
import { getIdentitySignerAddress, signVerification } from '$/utils/ethereum';
import { validatedHandler } from '$/utils/validation';

const TOKEN_LENGTH = 20;

class Payload {
  @IsString()
  address: string;

  @IsString()
  signature: string;

  @IsString()
  @MinLength(TOKEN_LENGTH)
  @MaxLength(TOKEN_LENGTH)
  token: string;
}

const handler: RequestHandler = validatedHandler(
  Payload,
  async ({ address: claimedAddress, signature, token }, req, res) => {
    const email = req.params.email ?? '';

    const signerAddress = getIdentitySignerAddress({
      email,
      signature,
      token,
    });

    // claimedAddress is the address claimed by the user, but only
    // signerAddress can be trusted. This check is added as a safety measure
    // in case the signature verification fails (i.e. wrong chain), we want
    // to be loud about it and not silently accept a wrong address.
    if (signerAddress !== claimedAddress) {
      res.status(400).json({
        error: 'SIGNATURE_INVALID',
      });
      return;
    }

    const valid = await consumeToken({
      email,
      token,
    });

    if (!valid) {
      res.status(400).json({
        error: 'TOKEN_INVALID',
      });
      return;
    }

    const { signature: verificationSignature, timestamp } = signVerification({
      address: signerAddress,
      email,
    });

    res.status(200).json({
      signature: verificationSignature,
      timestamp,
    });
  },
);

export default handler;
