import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

dotenv.config();

const notAuthorizedJson = { status: 401, message: "Unauthorized." };

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id);
    if (user) return done(null, user)
    else return done(notAuthorizedJson, false);
}))



export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (error, user) => {
        req.user = user;
        if (user.dataValues.user_id === parseInt(req.params.id)) return next()
        else return next(notAuthorizedJson)
    });

    authFunction(req, res, next);
}