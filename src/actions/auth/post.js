import bcrypt from 'bcrypt-nodejs';
import UserFullResponse from 'responses/user-full';
import { User } from 'models';

export default async (req, res) => {
  const { email } = req.body;
  const user = await User.scope('fullIncludes').find({ where: { email } });
  bcrypt.compare(req.body.password, user.password, async (err, result) => {
    if (result) {
      const userResponse = new UserFullResponse({ user });
      const responseData = await userResponse.toJSON();
      res.render('login', { data: responseData });
    } else {
      res.redirect('/login');
    }
  });
};
