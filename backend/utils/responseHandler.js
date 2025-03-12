class ResponseHandler {
  static success(res) {
    return (message, data = null) => {
      return res.status(200).json({
        success: true,
        code: 200,
        message,
        data
      });
    };
  }

  static created(res) {
    return (message, data = null) => {
      return res.status(201).json({
        success: true,
        code: 201,
        message,
        data
      });
    };
  }

  static error(res) {
    return (message, data = null) => {
      return res.status(400).json({
        success: false,
        code: 400,
        message,
        data
      });
    };
  }

  static unauthorize(res) {
    return (message, data = null) => {
      return res.status(401).json({
        success: false,
        code: 401,
        message,
        data
      });
    };
  }

  static forbidden(res) {
    return (message, data = null) => {
      return res.status(403).json({
        success: false,
        code: 403,
        message,
        data
      });
    };
  }

  static notFound(res) {
    return (message, data = null) => {
      return res.status(404).json({
        success: false,
        code: 404,
        message,
        data
      });
    };
  }

  static serverError(res) {
    return (message = 'Internal server error', data = null) => {
      return res.status(500).json({
        success: false,
        code: 500,
        message,
        data
      });
    };
  }

  static rateLimit(res) {
    return (message, data = null) => {
      return res.status(429).json({
        success: false,
        code: 429,
        message,
        data
      });
    };
  }
}

export default ResponseHandler;
