export default class Request {
  constructor(req) {
    this.req = req;
    this.privateErrors = [];
  }

  addError(field, message) {
    this.privateErrors.push({ field, error: message });
  }

  set errors(array) {
    this.privateErrors = array;
  }

  get errors() {
    return this.privateErrors;
  }

  isValid() {
    return this.privateErrors.length === 0;
  }
}
