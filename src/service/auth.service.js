import db from "../db/index.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import { config } from "dotenv";


config()

export const AuthService = {
    register: async (data) => {
        try {
            const userExists = await db('users').select('*').where('email', '=', data.email)
            
            if(userExists.length != 0){
                return {
                    success: false,
                    status: 409,
                    message: `${data.email} already Exists`
                }
            }
    
            const satsRound = 10
            data.password = await bcrypt.hash(data.password, satsRound)
    
            const result = await db('users').insert(data).returning('*')
    
            if(result.length == 0){
                return {
                    success: false,
                    status: 500,
                    message: `Ro'yxatdan o'tishda muammo yz berdi`
                }
            }
    
            const {regiteredUser, ...password} = result[0]
            return {
                success: true,
                status: 201,
                message: regiteredUser
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    login: async (data) => {
        try {
            const currentUser = await db('users').select('*').where('email', '=', data.email)
            if(currentUser.length == 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Email or password is incorrect'
                }
            }
            
            const checkPassword = await bcrypt.compare(data.password, currentUser.password)
            
            if(!checkPassword){
                return {
                    success: false,
                    status: 404,
                    message: 'Email or password is incorrect'
                }
            }

            const payload = {
                email: currentUser.email,
                role: currentUser.role
            }
            
            const accessToken = Jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: process.env.JWT_ACCESS_EXPIRES
            })
            const refreshToken = Jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXPIRES
            })

            return {
                success: true,
                status: 200,
                accessToken,
                refreshToken
            }

        } catch (error) {
            throw new Error(error)
        }
    }
}