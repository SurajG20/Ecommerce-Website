import ResponseHandler from '../utils/responseHandler.js';

const notFound = (req, res) => {
  return ResponseHandler.notFound(res)('Route does not exist');
};

export default notFound;
