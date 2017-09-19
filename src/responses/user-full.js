const prepareResponse = async ({ user }) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  some_count_field: user.some_count_field,
});

class UserFullResponse {
  constructor({ user }) {
    this.user = user;
  }

  async toJSON() {
    if (this.responseObject === undefined) {
      this.responseObject = await prepareResponse({ user: this.user });
    }
    return this.responseObject;
  }
}

export default UserFullResponse;
