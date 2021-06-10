import { SESV2 } from 'aws-sdk';
import { stripIndents } from 'common-tags';

import { AWS_REGION, EMAIL_SENDER } from '$/config';
import { env } from './env';

const ses = new SESV2({
  apiVersion: '2019-09-27',
  region: AWS_REGION,
});

const WEB_DOMAIN_NAME = env('WEB_DOMAIN_NAME');

export async function sendEmail({ to, token }: { to: string; token: string }) {
  await ses
    .sendEmail({
      Content: {
        Simple: {
          Subject: {
            Charset: 'utf-8',
            Data: 'Verifica tu email en Dandercoin',
          },
          Body: {
            Text: {
              Charset: 'utf-8',
              Data: stripIndents`Haz click en este enlace para verificar tu email en Dandercoin:
              
              https://${WEB_DOMAIN_NAME}/verify?email=${encodeURIComponent(
                to,
              )}&token=${token}`,
            },
          },
        },
      },
      Destination: {
        ToAddresses: [to],
      },
      FromEmailAddress: EMAIL_SENDER,
    })
    .promise();
}
