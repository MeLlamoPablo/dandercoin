import { Router } from 'express';

import createVerification from './createVerification';
import finishVerification from './finishVerification';

const router = Router();

router
  .route('/')
  .post(createVerification)
  .all((_, res) => res.status(405).send());

router
  .route('/:email')
  .put(finishVerification)
  .all((_, res) => res.status(405).send());

export default router;
