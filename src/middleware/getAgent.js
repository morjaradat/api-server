const getAgent = (req, res, next) => {
  req.myName = "mohammad";
  req.browser = req.headers["user-agent"];
  next();
};
module.exports = getAgent;
