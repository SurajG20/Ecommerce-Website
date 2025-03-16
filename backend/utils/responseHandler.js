class ResponseHandler {
  static success(res) {
    return (message, data = null) => {
      return res.status(200).json({
        success: true,
        message,
        data,
      });
    };
  }

  static created(res) {
    return (message, data = null) => {
      return res.status(201).json({
        success: true,
        message,
        data,
      });
    };
  }

  static error(res) {
    return (message, data = null) => {
      return res.status(202).json({
        success: false,
        message,
        data,
      });
    };
  }

  static unauthorize(res) {
    return (message, data = null) => {
      return res.status(401).json({
        success: false,
        message,
        data,
      });
    };
  }

  static forbidden(res) {
    return (message, data = null) => {
      return res.status(403).json({
        success: false,
        message,
        data,
      });
    };
  }

  static notFound(res) {
    return (message, data = null) => {
      return res.status(404).json({
        success: false,
        message,
        data,
      });
    };
  }

  static serverError(res) {
    return (message = 'Internal server error', data = null) => {
      return res.status(500).json({
        success: false,
        message,
        data,
      });
    };
  }

  static rateLimit(res) {
    return (message, data = null) => {
      return res.status(429).json({
        success: false,
        message,
        data,
      });
    };
  }

  static maintenance(res) {
    return (message, data = null) => {
      return res.status(503).json({
        success: false,
        message,
        data,
      });
    };
  }
}

export default ResponseHandler;
