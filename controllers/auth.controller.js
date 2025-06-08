const userModel = require("../models/user.model");
const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await authService.register(email, password);
      res.cookie("refreshToken", newUser.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
