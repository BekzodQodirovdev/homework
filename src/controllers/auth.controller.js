import { authService } from "../services/auth.service.js"

export const authController = {
    register: async (req, res, next) => {
        try {
            const data = req.body
            const result = await authService.create({
                ...data,
            })
            if (result.success) {
                return res.status(result.status).send("Creted: " + result.message)
            } else {
                return res.status(result.status).send("Barchasini to'ldiring")
            }
        } catch (error) {

            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).send("Malumotlarni kiritish shart")
            }
            const result = await authService.login({ email, password })
            if (!result) {
                res.status(404).send("email yoki password xato")
            }
            res.status(200).send("Welcome")
        } catch (error) {

            next(error)
        }
    },
}