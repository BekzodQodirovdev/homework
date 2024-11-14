import jwt from "jsonwebtoken";
import { OTP, User } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
import { otpGenerator, sendMail } from "../helpers/index.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { userfindOne, createUser } from "../service/index.js";

export const registerController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const currentUser = await userfindOne({ email });

    if (!currentUser) {
      const otp = otpGenerator();

      await sendMail(email, "OTP", `this is your OTP: ${otp}`);

      const user = await createUser(req.body);

      const db_otp = new OTP({
        user_id: user._id,
        otp_code: otp,
        user,
      });

      await db_otp.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await userfindOne({ email });

    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    const passwordIsEqual = await currentUser.compare(password);

    if (!passwordIsEqual) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send(errorMessages.INVALID_CREDENTIALS);
    }

    const payload = {
      id: currentUser._id,
      sub: email,
      role: currentUser.role,
    };

    const accessSecretKey = process.env.JWT_ACCESS_SECRET;
    const refreshSecretKey = process.env.JWT_REFRESH_SECRET;

    const accessToken = jwt.sign(payload, accessSecretKey, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, refreshSecretKey, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const verifyController = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    const currentUser = await userfindOne({ email });
    const currentOtp = await OTP.findOne({ user_id: currentUser._id });

    const isEqual = currentOtp.verify(otp);

    if (!isEqual) {
      return res.send("OTP is not valid");
    }

    await OTP.deleteOne({ user_id: currentUser._id });
    await User.updateOne(
      { email },
      {
        is_active: true,
      }
    );

    res.send("user is actived");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const forgerPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userData = await userfindOne({ email });
    if (!userData) {
      return res.status(400).send({
        msg: "Bunday user mavjud emas",
      });
    }
    const newPassword = v4();

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    await User.updateOne(
      { _id: userData._id },
      {
        password: hashPass,
      }
    );

    await sendMail(email, "OTP", `this is your new password: ${newPassword}`);

    res.status(202).send({
      msg: "Yangi parol emailga yuborildi.",
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
