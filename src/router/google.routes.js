import { Router } from "express";
import passport from "passport";
import { loginController } from "../controller/user.controller.js"
import "../strategies/passport-google.js";


export const googleRouter = new Router()

googleRouter.post("/auth/login", loginController)

googleRouter.get(
    "/profile",
    (req, res) => {
        // eslint-disable-next-line no-console
        console.log(req.user)
        res.send("OK")
    }
)

googleRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] })
);

googleRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/api/v1/profile');
    });