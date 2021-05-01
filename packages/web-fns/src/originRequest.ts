/* eslint-disable @typescript-eslint/require-await */
import type { CloudFrontRequestHandler } from 'aws-lambda';

declare const __PAGE_ROUTES__: readonly string[];

function isPageRoute(url: string): boolean {
  return __PAGE_ROUTES__.includes(url);
}

// noinspection JSUnusedGlobalSymbols
export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0]?.cf.request;

  if (!request) {
    return request;
  }

  const url = request.uri;

  if (isPageRoute(url)) {
    request.uri = `${url}.html`;
  }

  return request;
};
