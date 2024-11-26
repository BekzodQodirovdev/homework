import {
    getAllUserService,
    getByIdUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    getByEmailUserService,
    createOtpServise,
    deleteOtpServise,
    findOtpServise,
} from "../service/index.js"
import { userValidate } from "../validators/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendMail } from "../helpers/mail.js"
import { otpGenerator } from "../helpers/otp.js"

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const currentUser = await getByEmailUserService(email)

        if (!currentUser) {
            return res.status(400).send("Email yoki password xato")
        }

        const passwordIsEqual = await bcrypt.compare(
            password,
            currentUser.password,
        )

        if (!passwordIsEqual) {
            return res.status(400).send("Email yoki password xato")
        }

        const payload = {
            id: currentUser.id,
            sub: currentUser.email,
            role: currentUser.role,
        }
        const accessTokenKey = process.env.JWT_ACCESS_SECRET
        const refreshTokenKey = process.env.JWT_REFRESH_SECRET

        const accessToken = jwt.sign(payload, accessTokenKey, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        })

        const refreshToken = jwt.sign(payload, refreshTokenKey, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        })

        res.send(accessToken, refreshToken)
    } catch (err) {
        next(err)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { error, value } = userValidate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message })
        }

        const userFind = await getByEmailUserService(req.body.email)
        if (userFind) {
            return res
                .status(409)
                .send({ status: "CONFLICT", message: "Duplicate email found" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const updateData = {
            ...req.body,
            password: hashPassword,
        }

        const data = await createUserService(updateData)

        const otp = otpGenerator()
        await sendMail(req.body.email, "OTP", `this is your OTP: ${otp}`)
        await createOtpServise(data.id, otp)

        return res.status(201).send({ status: "CREATED", data })
    } catch (err) {
        next(err)
    }
}

export const verifyController = async (req, res, next) => {
    try {
        const { otp, email } = req.body

        const currentUser = await getByEmailUserService(email)
        const currentOtp = await findOtpServise(currentUser.id)

        const isEqual = currentOtp.otp_code == otp

        if (!isEqual) {
            return res.send("OTP is not valid")
        }

        await deleteOtpServise(currentUser.id)
        await updateUserService(
            currentUser.id,
            {
                is_active: true,
            },
        )

        res.send("user is actived")
    } catch (error) {
        next(new ApiError(error.statusCode, error.message))
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit
        const data = await getAllUserService(skip, limit)
        if (data.length == 0) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "ok", data })
    } catch (err) {
        next(err)
    }
}

export const getByIdUser = async (req, res, next) => {
    try {
        const data = await getByIdUserService(req.params.id)
        if (!data) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        res.status(200).send({ status: "OK", data })
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const oldUser = await getByIdUserService(req.params.id)
        if (!oldUser) {
            return res
                .status(404)
                .send({ status: "NOT FOUND", message: "User not found" })
        }

        let updateData = { ...req.body }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            updateData.password = hashPassword
        }

        const newData = { ...oldUser, ...updateData }
        const data = await updateUserService(req.params.id, newData)

        res.status(202).send({ status: "UPDATED", data })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const oldUser = await getByIdUserService(req.params.id)
        if (!oldUser) {
            return res.status(404).send({ status: "NOT FOUND" })
        }
        const data = await deleteUserService(req.params.id)
        res.status(200).send({ status: "DELETED" })
    } catch (err) {
        next(err)
    }
}
