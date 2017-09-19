export default (RequestClass, redirectPath) => async (req, res, next) => {
  const request = new RequestClass(req);
  await request.validate();
  if (request.isValid() === false) {
    const errors = {};
    request.errors.forEach((el) => { errors[el.param] = { message: el.msg, value: el.value }; });
    req.flash('validation-errors', JSON.stringify(errors));
    return res.redirect(redirectPath);
  }

  return next();
};
