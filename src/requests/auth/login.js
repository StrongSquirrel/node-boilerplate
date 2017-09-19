import BaseRequest from 'requests';

export default class LoginPostRequest extends BaseRequest {
  async validate() {
    this.req.checkBody({
      email: {
        notEmpty: { errorMessage: 'Email cannot be empty' },
        isEmail: { errorMessage: 'Invalid Email' },
      },
      password: {
        notEmpty: { errorMessage: 'Password cannot be empty' },
      },
    });
    const result = await this.req.getValidationResult();
    if (result.isEmpty() === false) {
      this.errors = result.useFirstErrorOnly().array();
      return;
    }
    this.req.checkBody({
      email: {
        existsEmail: {
          errorMessage: 'User with this email and password is not found',
        },
      },
    });
    const existsResult = await this.req.getValidationResult();
    if (existsResult.isEmpty() === false) {
      this.errors = existsResult.useFirstErrorOnly().array();
    }
  }
}
