import { Request, Response } from "express";
import { User } from "../database/models/users";
import Member from "../database/models/members";
import { loginService, registerService } from "../services/userServices";
import bcrypt from "bcrypt";

//refactor to services
export const loginController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const { username, password } = rq.body;

    if (!password) {
      return re.status(400).json({ msg: "Please write a password" });
    }

   const result = await loginService(username, password)


   if (result.error) {
    return re.status(result.status || 500).json({ msg: result.msg });
  }

  rq.session.user = result.user;
  re.status(200).json({ msg: "Login successful!" });
  } catch (err) {
    console.error(err);
    re.status(500).json({msg: "Server error"});
  }
};


export const registerController = async (rq: Request, re: Response) => {
  try {
    const { username, password, isAdmin } = rq.body;
    const newUser = await registerService({ username, password, isAdmin });
    rq.session.user = newUser;
    return re.status(200).json({ msg: "User created" });
  } catch (error: any) {

      return re.status(500).json({ msg: error.message });
  }
};