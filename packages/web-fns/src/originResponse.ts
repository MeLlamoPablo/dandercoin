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
          default-src 'none'; 
          base-uri 'self'; 
          connect-src 
            https://identity-api.danderco.in/ 
            https://identity-api.staging.danderco.in/ 
            https://rpc-mainnet.maticvigil.com/ 
            https://rpc-mumbai.maticvigil.com/
          ; 
          font-src 'self'; 
          form-action 'none'; 
          frame-ancestors 'none'; 
          img-src 
            'self' 
            https://media.giphy.com/ 
            https://www.gravatar.com/
          ; 
          prefetch-src 'self'; 
          sandbox 
            allow-forms 
            allow-popups 
            allow-same-origin 
            allow-scripts
          ; 
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
