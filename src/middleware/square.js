function square(number = 0) {
  return (req, res, next) => {
    if (!isNaN(req.params.num)) {
      let paramNumber = parseInt(req.params.num);
      req.sumNumber = paramNumber * paramNumber;
    } else {
      req.sumNumber = number * number;
    }
    next();
  };
}

module.exports = square;
