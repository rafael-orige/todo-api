import { Request, Response } from "express";
import { User } from "../models/User";
import { UserVerify } from "../models/UserVerify";
import { Todo } from "../models/Todo"; // Need to import todo. When deleting user I need to delete all todos that belongs to the user.
import { generateToken } from "../config/passport";
import { sendEmail } from "../utils/email";
import md5 from "md5";

export const registerUser = async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            where: { user_email: req.body.email }
        })

        if (!user) {
            let user = await User.create({
                user_email: req.body.email,
                user_password: req.body.password,
                user_name: req.body.name
            })

            let token = md5(req.body.email);

            await UserVerify.create({
                hash: token,
                user_id: user.user_id
            })

            const message = `${process.env.BASE_URL}/verify/${user.user_id}/${token}`;
            await sendEmail(user.user_email, "Email verification", message)

            res.status(201);
            res.json({ status: "User created sucessfully" })
        } else {
            res.json({ status: "User already exists" });
            res.status(406);
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            where: { user_email: req.headers.email, user_password: req.headers.password }
        });

        if (user) {
            if (!user.verified) {
                res.json({ status: false, error: "Must verify email" });
            } else {
                const token = generateToken({ id: user.user_id });
                res.json({ status: true, token, id: user.user_id });
            };
        } else {
            res.status(404)
            res.json({ status: false, error: "User does not exist." });
        };
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            where: { user_email: req.body.email }
        })


        if (user) {
            let userTodos = await Todo.findAll({
                where: { user_id: user.user_id }
            });
            if (userTodos) {
                await Todo.destroy({
                    where: { user_id: user.user_id }
                })
            }

            await User.destroy({
                where: { user_id: user.user_id }
            });
            res.status(200);
            res.json({ status: `User ${req.body.email} deleted.` });
        } else {
            res.status(404);
            res.json({ status: "User not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ error: "Something bad happened." });
    }
};

export const userData = async (req: Request, res: Response) => {
    try {
        let data = await User.findByPk(req.params.id);
        if (data) {
            res.status(200)
            res.json({
                status: true, user: data
            })
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        let user = await User.findByPk(req.params.id);

        if (user && !user.verified) {
            let verify = await UserVerify.findOne({
                where: { hash: req.params.token, user_id: req.params.id }
            })
            if (verify) {
                const emailMatch = req.params.token === verify.hash;
                if (emailMatch) {
                    await User.update({ verified: true }, {
                        where: { user_email: user.user_email }
                    })

                    await UserVerify.destroy({
                        where: { hash: verify.hash }
                    })

                    res.status(200);
                    res.json({ status: true, message: "Email verified!" });
                }
            }
        } else {
            res.json({ status: false, message: "Email not verified" });
        }
    } catch (error) {
        res.status(400);
        res.json({ error: `Something bad happened. ${error}` })
    }
}
