const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const { validateBody, authenticate } = require("../../middlewares");

//signup
router.post(
  "/registration",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

//signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/users",
  authenticate,
  // validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
