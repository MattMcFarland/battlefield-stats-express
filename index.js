const BattlefieldStats = require('battlefield-stats');

/**
 * Available options:
 * @param apiKey - required
 * @param sendImmediately - respond to the request immediately
 * when false, it will add data to request object as bfData and call next
 * (default is true)
 */
module.exports = function (apiKey, sendImmediately = true) {
  const {Api} = new BattlefieldStats(apiKey);
  return function (req, res, next) {
    const params = req.method === 'POST' ? req.body : req.query;
    Api.request(req.path, params, (error, bfData) => {
      if (error) return next(error);
      if (sendImmediately) return res.send(bfData);
      req.bfData = bfData;
      next();
    })
  }
}

