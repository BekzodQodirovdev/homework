import { AuthService } from "../service/index.js";

export const AuthController = {
    register: async (c) => {
        try {
            const user = c.req.body
            const result = await AuthService.register(user)
            if(!result.success){
                return c.json({
                    message: result.message
                }, result.status)
            }
            return c.json({
                message: result.message
            }, result.status)
        } catch (error) {
            c.next(error)
        }
    },
    login: async (c) => {
        try {
            const user = c.req.body
            const result = await AuthService.login(user)
            if(!result.success){
                return c.json({
                    message: result.message
                }, result.status)
            }
            return c.json({
                access: result.accessToken,
                refres: result.refreshToken
            })
        } catch (error) {
            c.next(error)
        }
    }
}