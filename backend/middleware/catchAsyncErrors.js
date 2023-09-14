module.exports = (catchHandler) => (req, res, next) => {
  Promise.resolve(catchHandler(req, res, next)).catch(next);
};
