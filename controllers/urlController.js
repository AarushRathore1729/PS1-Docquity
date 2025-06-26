const urlService = require('../services/urlService');
const { catchAsync } = require('../middleware/errorHandler');
const { ValidationError, NotFoundError } = require('../middleware/errors');

class UrlController {
  handleResponse(result, res) {
    if (!result.success) {
      // Create appropriate error based on status code
      switch (result.statusCode) {
        case 400:
          throw new ValidationError(result.message);
        case 404:
          throw new NotFoundError(result.message);
        case 409:
          throw new ValidationError(result.message);
        default:
          throw new Error(result.message || 'Internal server error');
      }
    }
    
    const status = result.statusCode || 200;
    res.status(status).json(result);
  }

  createShortUrl = catchAsync(async (req, res) => {
    const host = `${req.protocol}://${req.get('host')}`;
    const result = await urlService.createShortUrl(req.body, host);
    this.handleResponse(result, res);
  });

  getAllUrls = catchAsync(async (req, res) => {
    const result = await urlService.getAllUrls();
    this.handleResponse(result, res);
  });

  getUrlById = catchAsync(async (req, res) => {
    const result = await urlService.getUrlById(req.params.id);
    this.handleResponse(result, res);
  });

  updateUrlById = catchAsync(async (req, res) => {
    const result = await urlService.updateUrlById(req.params.id, req.body);
    this.handleResponse(result, res);
  });

  updateUrlByShortCode = catchAsync(async (req, res) => {
    const result = await urlService.updateUrlByShortCode(req.params.shortCode, req.body);
    this.handleResponse(result, res);
  });

  deleteUrlById = catchAsync(async (req, res) => {
    const result = await urlService.deleteUrlById(req.params.id);
    this.handleResponse(result, res);
  });

  deleteUrlByShortCode = catchAsync(async (req, res) => {
    const result = await urlService.deleteUrlByShortCode(req.params.shortCode);
    this.handleResponse(result, res);
  });

  redirectToOriginal = catchAsync(async (req, res) => {
    const result = await urlService.redirectToOriginal(req.params.shortCode);
    if (result.success) {
      res.redirect(result.redirectUrl);
    } else {
      this.handleResponse(result, res);
    }
  });
}

module.exports = new UrlController();