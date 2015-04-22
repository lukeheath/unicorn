/**
 * Generic Error Handler / Classifier
 *
 * Calls the appropriate custom response for a given error,
 * out of the bundled response modules:
 * badRequest, forbidden, notFound, & serverError
 *
 * Defaults to `res.serverError`
 *
 * Usage:
 * ```javascript
 * if (err) return res.negotiate(err);
 * ```
 *
 * @param {*} error(s)
 *
 */

module.exports = function (err) {

  // Get access to response object (`res`)
  var res = this.res;

  var statusCode = 500;
  var body = err || {};

  var Path = require('path');
  try {

    statusCode = err.status || 500;

    // Set the status
    // (should be taken care of by res.* methods, but this sets a default just in case)
    res.status(statusCode);

  } catch (e) {}

  // Respond using the appropriate custom response
  if (statusCode === 403) return res.forbidden(body.data || body);
  if (statusCode === 404) return res.notFound(body.data || body);
  if (statusCode === 400 && (err.code == "E_MACHINE_RUNTIME_VALIDATION" || err.code == "E_INVALID_TYPE") && !this.req.wantsJSON) {
    return res.view("validationError", {data: sails.config.environment == 'production' ? undefined : err, _layoutFile: false}, function(viewErr, result) {
      if (viewErr) {return res.json(viewErr);}
      return res.send(result);
    });
  }
  if (statusCode === 500 && (err.code == "E_VIEW_FAILED")) {
    return res.view("noView", {data: sails.config.environment == 'production' ? undefined : err, _layoutFile: false}, function(viewErr, result) {
      if (viewErr) {return res.json(viewErr);}
      return res.send(result);
    });
  }
  else if (statusCode >= 400 && statusCode < 500) return res.badRequest(body.data || body);
  else return res.serverError(body.data || body);
};
