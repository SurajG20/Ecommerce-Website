class ResponseHandler {
  static success(res) {
    return (message, data = null) => {
      return res.status(201).json({
        status: 'success',
        code: 201,
        message,
        data
      });
    };
  }

  static error(res) {
    return (message, data = null) => {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message,
        data
      });
    };
  }

  static unauthorize(res) {
    return (message, data = null) => {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message,
        data
      });
    };
  }

  static forbidden(res) {
    return (message, data = null) => {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message,
        data
      });
    };
  }

  static rateLimit(res) {
    return (message, data = null) => {
      return res.status(429).json({
        status: 'error',
        code: 429,
        message,
        data
      });
    };
  }
}

export default ResponseHandler;
