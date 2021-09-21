/* eslint-disable no-console */

import {
  CloudFrontClient,
  GetDistributionCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront';
import {
  GetFunctionCommand,
  LambdaClient,
  UpdateFunctionCodeCommand,
} from '@aws-sdk/client-lambda';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { produce } from 'immer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });
const lambda = new LambdaClient({ region: 'us-east-1' });

const basePath = join(dirname(fileURLToPath(import.meta.url)), '..');
const buildPath = join(basePath, '/build');

async function readArchive(archiveName) {
  return readFile(join(buildPath, archiveName));
}

async function getDeployedHash(functionName) {
  const response = await lambda.send(
    new GetFunctionCommand({
      FunctionName: functionName,
    }),
  );

  const codeSha256 = response.Configuration?.CodeSha256;

  if (!codeSha256) {
    throw new Error('Unexpected response from Lambda: no code sha256!');
  }

  return codeSha256;
}

function getLocalHash(archiveBytes) {
  return createHash('sha256').update(archiveBytes).digest('base64');
}

async function publishNewCode(functionName, archiveBytes) {
  const response = await lambda.send(
    new UpdateFunctionCodeCommand({
      FunctionName: functionName,
      Publish: true,
      ZipFile: archiveBytes,
    }),
  );

  return response.Version ?? '';
}

async function deployToDistribution(functionName, newVersion) {
  const response = await cloudfront.send(
    new GetDistributionCommand({
      Id: process.env.AWS_CF_DISTRIBUTION_ID,
    }),
  );

  const associations =
    response?.Distribution?.DistributionConfig?.DefaultCacheBehavior
      ?.LambdaFunctionAssociations;

  if (!associations || associations.Quantity === 0) {
    throw new Error(
      'Unexpected response from CloudFront: no lambda function associations!',
    );
  }

  await cloudfront.send(
    new UpdateDistributionCommand({
      Id: process.env.AWS_CF_DISTRIBUTION_ID,
      IfMatch: response.ETag,
      DistributionConfig: produce(
        response.Distribution.DistributionConfig,
        (next) => {
          const lambda =
            next.DefaultCacheBehavior.LambdaFunctionAssociations.Items.find(
              (fn) => fn.LambdaFunctionARN.includes(functionName),
            );

          if (!lambda) {
            return;
          }

          const arnParts = lambda.LambdaFunctionARN.split(':');
          const arnPartsWithoutVersion = arnParts.slice(0, -1);

          lambda.LambdaFunctionARN = [
            ...arnPartsWithoutVersion,
            newVersion,
          ].join(':');
        },
      ),
    }),
  );
}

async function updateLambdaFunction(functionName, archiveName) {
  const [deployedHash, archiveBytes] = await Promise.all([
    getDeployedHash(functionName),
    readArchive(archiveName),
  ]);

  const localHash = getLocalHash(archiveBytes);

  if (deployedHash === localHash) {
    console.log(`${functionName} is up-to-date, nothing to do.`);
    return;
  }

  console.log(`Publishing ${functionName}...`);
  const newVersion = await publishNewCode(functionName, archiveBytes);

  console.log(
    `Deploying ${functionName} version ${newVersion} to CloudFront...`,
  );
  await deployToDistribution(functionName, newVersion);

  console.log(`Success! ${functionName} was updated`);
}

async function main() {
  await updateLambdaFunction(
    process.env.AWS_LAMBDA_ORIGIN_REQUEST_FUNCTION_ARN,
    'origin_request_lambda_function.zip',
  );
  await updateLambdaFunction(
    process.env.AWS_LAMBDA_ORIGIN_RESPONSE_FUNCTION_ARN,
    'origin_response_lambda_function.zip',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
