const BaseError = require("../errors/base.error");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");

class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw BaseError.BadRequest(
        `User with existing email ${email} already registered`
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: hashPassword });
    const userDto = new UserDto(newUser);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw BaseError.BadRequest("User is not defined");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.BadRequest("Password is incorrect");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDb) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }

    const user = await userModel.findById(userPayload.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
