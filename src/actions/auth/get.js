export default async (req, res) => {
  const validationErrors = req.flash('validation-errors').pop();
  res.render('login', {
    message: 'Example',
    validationErrors: JSON.parse(validationErrors || '{}'),
  });
};
