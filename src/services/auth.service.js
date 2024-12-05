import User from "../models/user.js"

export const authService = {
    register: async (data) => {
        try {
            const user = User(data)
            user.save()

            return {
                success: true,
                status: 200,
                message: user,
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    login: async (data) => {
        try {
            const userFind = User.findOne({ email: data.email })
            if (!userFind) {
                return {
                    success: false,
                    status: 404,
                    message: "Email yoki password xato",
                }
            } else {
                if (userFind.password == data.password) {
                    return {
                        success: true,
                        status: 200,
                        message: "Welcome",
                    }
                } else {
                    return {
                        success: true,
                        status: 404,
                        message: "Email yoki password xato",
                    }
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}