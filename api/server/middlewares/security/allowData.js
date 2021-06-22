const DataNotAllowedError = require('../../errors/DataNotAllowedError');

const allowData = (params) => (req, _res, next) => {
  const sendedData = Object.keys(req.body);
  if (params.includes(...sendedData)) {
    return next();
  }
  return next(new DataNotAllowedError());
};

module.exports = allowData;
