"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailTest = exports.userData = exports.deleteUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const UserVerify_1 = require("../models/UserVerify");
const Todo_1 = require("../models/Todo"); // Need to import todo. When deleting user I need to delete all todos that belongs to the user.
const passport_1 = require("../config/passport");
const email_1 = require("../utils/email");
const md5_1 = __importDefault(require("md5"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({
        where: { user_email: req.body.email }
    });
    if (!user) {
        let user = yield User_1.User.create({
            user_email: req.body.email,
            user_password: req.body.password,
            user_name: req.body.name
        });
        let token = (0, md5_1.default)(req.body.email);
        yield UserVerify_1.UserVerify.create({
            hash: token,
            user_id: user.user_id
        });
        const message = `${process.env.BASE_URL}/verify/${user.user_id}/${token}`;
        yield (0, email_1.sendEmail)(user.user_email, "Email verification", message);
        res.status(201);
        res.json({ status: "User created sucessfully", user });
    }
    else {
        res.json({ status: "User already exists" });
        res.status(406);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.User.findOne({
            where: { user_email: req.headers.email, user_password: req.headers.password }
        });
        if (user) {
            if (!user.verified) {
                res.json({ status: false, error: "Must verify email" });
            }
            else {
                const token = (0, passport_1.generateToken)({ id: user.user_id });
                res.json({ status: true, token, id: user.user_id });
            }
            ;
        }
        else {
            res.json({ status: false, error: "User does not exist" });
        }
        ;
    }
    catch (error) {
        res.json({ status: false, error });
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.User.findOne({
            where: { user_email: req.body.email }
        });
        if (user) {
            let userTodos = yield Todo_1.Todo.findAll({
                where: { user_id: user.user_id }
            });
            if (userTodos) {
                yield Todo_1.Todo.destroy({
                    where: { user_id: user.user_id }
                });
            }
            yield User_1.User.destroy({
                where: { user_id: user.user_id }
            });
            res.status(200);
            res.json({ status: `Usuario com o email ${req.body.email} deletado` });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json({ error: "Ocorreu um problema" });
    }
});
exports.deleteUser = deleteUser;
const userData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_1.User.findByPk(req.params.id);
    if (data) {
        res.status(200);
        res.json({
            status: true, user: data
        });
    }
});
exports.userData = userData;
const verifyEmailTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findByPk(req.params.id);
    if (user && !user.verified) {
        let verify = yield UserVerify_1.UserVerify.findOne({
            where: { hash: req.params.token, user_id: req.params.id }
        });
        if (verify) {
            const emailMatch = req.params.token === verify.hash;
            if (emailMatch) {
                yield User_1.User.update({ verified: true }, {
                    where: { user_email: user.user_email }
                });
                yield UserVerify_1.UserVerify.destroy({
                    where: { hash: verify.hash }
                });
                res.status(200);
                res.json({ status: true, message: "Email verified!" });
            }
        }
    }
    else {
        res.json({ status: false, message: "Email not verified" });
    }
});
exports.verifyEmailTest = verifyEmailTest;
