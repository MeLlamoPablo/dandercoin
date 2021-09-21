import { stripIndents } from 'common-tags';
import sendgrid from '@sendgrid/mail';

import { EMAIL_SENDER } from '$/config';
import { env } from './env';

sendgrid.setApiKey(
  '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',
); // TODO

const WEB_DOMAIN_NAME = env('WEB_DOMAIN_NAME');

export async function sendEmail({ to, token }: { to: string; token: string }) {
  await sendgrid.send({
    to,
    from: EMAIL_SENDER,
    subject: 'Verifica tu email en Dandercoin',
    text: stripIndents`Haz click en este enlace para verificar tu email en Dandercoin:
              
    https://${WEB_DOMAIN_NAME}/verify?email=${encodeURIComponent(
      to,
    )}&token=${token}`,
  });
}
