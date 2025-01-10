import UserService from "../services/UserService.js";
import HttpError from "../utils/HttpError.js";
import { generateAccessToken } from "../utils/index.js";
import { validateRegisterData } from "../utils/validators.js";
import jwt from "jsonwebtoken";

class UsersController {
  constructor() {}

  static async register(req, res, next) {
    try {
      const { error } = validateRegisterData(req.body);

      if (error) throw new HttpError(400, error.details[0].message);

      const user = await UserService.findUserByEmail(req.body.email);

      if (user) throw new HttpError(409, "Email already registered");

      const newUser = await UserService.saveUser(req.body);

      res.json({ success: true, result: newUser });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if ((!email, !password)) {
        throw new HttpError(400, "All fields required");
      }

      const user = await UserService.findUserByEmail(email);

      if (!user) throw new HttpError(404, "User is not registered");

      const isMatch = await user.isValidPassword(password);

      if (!isMatch) throw new HttpError(401, "Incorrect Password");

      const accessToken = await generateAccessToken({ id: user._id });

      const refreshToken = await generateAccessToken(
        { id: user._id },
        "refresh"
      );

      res.cookie("rtk", refreshToken, {
        httpOnly: true,
      });

      res.send({
        success: true,
        data: accessToken,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("rtk");
      res.json({ success: true, data: req.user });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies;

      if (!cookies.rtk) throw new HttpError(403, "Forbidden");

      jwt.verify(
        cookies?.rtk,
        process.env.JWT_REFRESH_SECRET,
        async (error, payload) => {
          if (error) {
            throw new HttpError(401, "Forbidden");
          }

          req.user = payload;

          const user = await UserService.findUserById(req.user.id);

          const access_token = await generateAccessToken({
            id: user?._id,
            email: user?.email,
            iat: Math.floor(Date.now() / 1000) - 30,
          });

          res.send({ success: true, access_token });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = req.user.id;

      const profile = await UserService.findUserById(user);

      res.send({ success: true, result: profile });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      try {
        const user = await UserService.findUserById(req.user.id);

        res.send({ success: true, authenticated: true, user });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default UsersController;
