// TODO: Explain HTTP status codes - https://httpstatuses.com/

module.exports.created = function(res, payload = {}, location) {
  let locationUrl = location;

  if (!locationUrl) {
    // Infer location from request
    const { req } = res;
    const requestUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    locationUrl = requestUrl + '/' + payload.id;
  }

  res.setHeader('Location', locationUrl);
  return res.status(201).json({ ...payload });
};

module.exports.notFound = function(res, payload) {
  return res.status(404).json({ message: 'Resource not found', ...payload });
};

module.exports.unauthorized = function(res, payload) {
  return res.status(401).json({ message: 'Unauthorized', ...payload });
};

module.exports.forbidden = function(res, payload) {
  return res.status(403).json({ message: 'Forbidden', ...payload });
};

module.exports.badRequest = function(res, payload) {
  return res.status(400).json({ message: 'Bad request', ...payload });
};

module.exports.conflict = function(res, payload) {
  return res.status(409).json({ message: 'Conflict', ...payload });
};

module.exports.unexpectedError = function(res, payload) {
  return res.status(500).json({ message: 'Internal server error', ...payload });
};

module.exports.ok = function(res, payload) {
  return res.status(200).json({ message: 'ok', ...payload });
};

module.exports.notAcceptable = function(res, payload) {
  return res.status(406).json({ message: 'Value not accepted', ...payload });
};
