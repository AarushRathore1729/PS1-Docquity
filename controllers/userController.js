const userService = require('../services/userService');
const { catchAsync } = require('../middleware/errorHandler');
const { ValidationError, NotFoundError } = require('../middleware/errors');

class UserController {
  handleResponse(result, res) {
    if (!result.success) {
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

  createUser = catchAsync(async (req, res) => {
    const result = await userService.createUser(req.body);
    this.handleResponse(result, res);
  });

  getAllUsers = catchAsync(async (req, res) => {
    const result = await userService.getAllUsers();
    this.handleResponse(result, res);
  });

  getUserById = catchAsync(async (req, res) => {
    const result = await userService.getUserById(req.params.id);
    this.handleResponse(result, res);
  });

  updateUserById = catchAsync(async (req, res) => {
    const result = await userService.updateUserById(req.params.id, req.body);
    this.handleResponse(result, res);
  });

  deleteUserById = catchAsync(async (req, res) => {
    const result = await userService.deleteUserById(req.params.id);
    this.handleResponse(result, res);
  });
}

module.exports = new UserController();
