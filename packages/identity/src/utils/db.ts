import { DynamoDB } from 'aws-sdk';
import { nanoid } from 'nanoid/async';

import { AWS_REGION } from '$/config';

import { env } from './env';

const db = new DynamoDB({
  apiVersion: '2012-08-10',
  region: AWS_REGION,
});

const EMAIL_VERIFICATIONS_TABLE = env('DB_EMAIL_VERIFICATIONS_TABLE_NAME');

// DynamoDB wants seconds, not milliseconds
const dynamoDbNow = () => Math.floor(Date.now() / 1000);

export async function consumeToken({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const { Item } = await db
    .getItem({
      Key: {
        email: {
          S: email,
        },
      },
      TableName: EMAIL_VERIFICATIONS_TABLE,
    })
    .promise();

  if (Item?.token?.S !== token && dynamoDbNow() < +(Item?.expires_at?.N ?? 0)) {
    return false;
  }

  await db
    .deleteItem({
      Key: {
        email: {
          S: email,
        },
      },
      TableName: EMAIL_VERIFICATIONS_TABLE,
    })
    .promise();

  return true;
}

export async function generateToken(email: string) {
  const { Item } = await db
    .getItem({
      Key: {
        email: {
          S: email,
        },
      },
      TableName: EMAIL_VERIFICATIONS_TABLE,
    })
    .promise();

  if (Item?.token?.S && dynamoDbNow() < +(Item?.expires_at?.N ?? 0)) {
    return Item.token.S;
  }

  const token = await nanoid(20);

  await db
    .putItem({
      Item: {
        email: {
          S: email,
        },
        expires_at: {
          N: `${dynamoDbNow() + 15 * 60}`,
        },
        token: {
          S: token,
        },
      },
      TableName: EMAIL_VERIFICATIONS_TABLE,
    })
    .promise();

  return token;
}
