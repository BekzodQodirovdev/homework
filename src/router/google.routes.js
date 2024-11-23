import { Router } from "express";
import passport from "passport";
import "../strategies/passport-google.js";

export const googleRouter = Router()

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