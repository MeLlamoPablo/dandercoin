import serverless from '@vendia/serverless-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import type { ErrorRequestHandler } from 'express';
import express from 'express';

import verifications from './routes/verifications';
import { env } from './utils/env';

const app = express();

app.use(bodyParser.json());
app.use(
  cors(
    process.env.LAMBDA_TASK_ROOT
      ? {
          allowedHeaders: ['Authorization', 'Content-Type'],
          credentials: true,
          maxAge: 300,
          methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
          origin: [
            `http${
              env('WEB_DOMAIN_NAME').includes('localhost') ? '' : 's'
            }://${env('WEB_DOMAIN_NAME')}`,
          ],
        }
      : {},
  ),
);

app.use('/verifications', verifications);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).send();
};

app.use(errorHandler);

if (!!process.env.LAMBDA_TASK_ROOT) {
  // Running in AWS Lambda
  exports.handler = serverless({ app }).handler;
} else {
  const port = process.env.PORT ?? 8000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening in port ${port}`);
  });
}
