/* eslint-disable @typescript-eslint/require-await */
import type { CloudFrontRequestHandler } from 'aws-lambda';

// noinspection JSUnusedGlobalSymbols
export const handler: CloudFrontRequestHandler = async (event) => {
  const uri = event.Records[0]?.cf.request.uri;

  return {
    status: '307',
    statusDescription: 'Temporary Redirect',
    headers: {
      location: [
        {
          key: 'Location',
          value: `https://www.danderco.in${uri === '/index.html' ? '' : uri}`,
        },
      ],
      'strict-transport-security': [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubdomains; preload',
        },
      ],
    },
  };
};
