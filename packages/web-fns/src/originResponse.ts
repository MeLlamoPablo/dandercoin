/* eslint-disable @typescript-eslint/require-await */
import type { CloudFrontResponseHandler } from 'aws-lambda';
import { oneLineTrim } from 'common-tags';

// noinspection JSUnusedGlobalSymbols
export const handler: CloudFrontResponseHandler = async (event) => {
  const response = event.Records[0]?.cf.response;

  if (!response) {
    return response;
  }

  Object.assign(response.headers, {
    'content-security-policy': [
      {
        key: 'Content-Security-Policy',
        value: oneLineTrim`
          default-src 'self'; 
          frame-ancestors 'none'; 
          img-src 'self'; 
          script-src 'self' 'unsafe-inline'; 
          style-src 'self' 'unsafe-inline'
        `,
      },
    ],
    'referrer-policy': [{ key: 'Referrer-Policy', value: 'same-origin' }],
    'strict-transport-security': [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubdomains; preload',
      },
    ],
    'x-content-type-options': [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ],
    'x-frame-options': [{ key: 'X-Frame-Options', value: 'DENY' }],
    'x-xss-protection': [{ key: 'X-Xss-Protection', value: '1; mode=block' }],
  });

  return response;
};
