export class HttpCodes {
  static OK = {
    CODE: 200,
    MESSAGE: ''
  };
  static BAD_REQUEST = {
    CODE: 400,
    MESSAGE: 'Bad request.'
  };
  static UNAUTHORIZED = {
    CODE: 401,
    MESSAGE: 'Wrong Email/Password. Please try again.'
  };
  static FORBIDDEN = {
    CODE: 403,
    MESSAGE: 'Access forbidden.'
  };
  static NOT_FOUND = {
    CODE: 404,
    MESSAGE: 'Not Found.'
  };
  static SERVER_ERROR = {
    CODE: 500,
    MESSAGE: 'Something went wrong. Please try again.'
  };
  static UNPROCESSABLE_ENTITY = {
    CODE: 422,
    MESSAGE: ''
  };
  static SCHEDULED = {
    CODE: 200,
    MESSAGE: 'Successfully scheduled.'
  }
}
