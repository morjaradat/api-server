module.exports = (req, res, next)=> {
    req.timeStamp = new Date();
    console.log("middleware 1");
    next();
}