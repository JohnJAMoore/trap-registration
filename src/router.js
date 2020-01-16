import express from 'express';
const router = express.Router();

// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import GdprController from './controllers/gdpr.js';
import ComplyController from './controllers/comply.js';
import ConvictionController from './controllers/conviction.js';
import EligibleController from './controllers/eligible.js';
import GeneralController from './controllers/general.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';

// Configure all of the pages and routes.

router.use(
  Page({
    path: 'start',
    positiveForward: 'gdpr',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'gdpr',
    back: 'start',
    positiveForward: 'conviction',
    controller: GdprController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'gdpr',
    positiveForward: 'eligible',
    negativeForward: 'no-conviction',
    controller: ConvictionController
  })
);

router.use(
  Page({
    path: 'eligible',
    back: 'conviction',
    positiveForward: 'general',
    controller: EligibleController
  })
);

router.use(
  Page({
    path: 'general',
    back: 'eligible',
    positiveForward: 'comply',
    controller: GeneralController
  })
);

router.use(
  Page({
    path: 'comply',
    back: 'general',
    positiveForward: 'details',
    controller: ComplyController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'comply',
    positiveForward: 'confirm',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'details',
    positiveForward: 'success',
    controller: ConfirmController
  })
);

router.use(
  Page({
    path: 'success',
    back: 'details'
  })
);

router.use(
  Page({
    path: 'no-conviction',
    back: 'conviction'
  })
);

export {router as default};
