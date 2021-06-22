// eslint-disable-next-line import/no-extraneous-dependencies
const { check, validationResult } = require('express-validator');

exports.projectValidationData = async (req, res, next) => {
  await check('name')
    .exists()
    .notEmpty()
    .withMessage('you should add a name')
    .run(req);
  await check('description').exists().isLength({ min: 3 }).run(req);

  const validationResults = validationResult(req);

  if (validationResults.isEmpty()) {
    next();
  } else {
    next(new Error());
  }
};
