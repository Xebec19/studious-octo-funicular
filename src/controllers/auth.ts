import { Request, Response } from "express";
import { executeSql } from "../utils/executeSql";
import { IResponseData } from "../models/IResponseData";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../environment";
import bcrypt from "bcryptjs";
/**
 * @route /public/logout
 */
export const logout = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    await executeSql("DELETE FROM public.bazaar_tokens WHERE token = $1;", [
      `${token}`,
    ]);
    response = {
      message: "User logged out",
      status: true,
      data: true,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
    return;
  }
};

/**
 * @route /public/register
 */
export const register = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    let hashedPassword;
    const { rows } = await executeSql(
      "SELECT COUNT(USER_ID) FROM BAZAAR_USERS WHERE LOWER(EMAIL) = LOWER($1)",
      [email.trim()]
    );
    if (rows[0].count > 0) {
      throw new Error("User already exists");
    }
    await bcrypt.hash(password, 8, async (err, hash) => {
      if (err) throw new Error("error occurred while hashing");
      hashedPassword = hash;
      const userId = await executeSql(
        `
        INSERT INTO PUBLIC.BAZAAR_USERS(
            FIRST_NAME,
            LAST_NAME,
            EMAIL,
            PHONE,
            PASSWORD)
            VALUES ($1, $2, $3, $4, $5) RETURNING USER_ID;
        `,
        [firstName, lastName, email, +phone, hashedPassword]
      );
      const token = jwt.sign(
        {
          data: userId.rows[0].user_id,
        },
        `${jwtSecret}`,
        { expiresIn: "5d" }
      );
      await executeSql(
        `
        INSERT INTO PUBLIC.BAZAAR_TOKENS(
            USER_ID,
            TOKEN)
            VALUES ($1, $2);
        `,
        [userId.rows[0].user_id, token]
      );
      response = {
        message: "User registered successfully",
        status: true,
        data: "Bearer " + token,
      };
      res.status(201).json(response).end();
      return;
    });
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
    return;
  }
};

/**
 * @route /public/login
 */
export const login = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw new Error("email or password couldn't be blank");
    const user = await executeSql(
      "SELECT user_id,password FROM BAZAAR_USERS WHERE LOWER(EMAIL) = LOWER($1) and access = 'user';",
      [`${email.trim()}`]
    );
    if (!user.rows[0]) {
      throw new Error("User does not exist");
    }
    bcrypt.compare(password, user.rows[0].password, async (err, result) => {
      // if (err) throw new Error("Password didnt match");
      if (!result || err) {
        response = {
          message: "Password didnt match",
          status: false,
          data: false,
        };
        res.status(408).json(response).end();
        return;
      }
      const token = jwt.sign(
        {
          data: user.rows[0].user_id,
        },
        `${jwtSecret}`,
        { expiresIn: "5d" }
      );
      await executeSql(
        `
        INSERT INTO PUBLIC.BAZAAR_TOKENS(
            USER_ID,
            TOKEN)
            VALUES ($1, $2);
        `,
        [user.rows[0].user_id, token]
      );
      response = {
        message: "User logged in successfully",
        status: true,
        data: "Bearer " + token,
      };
      res.status(201).json(response).end();
      return;
    });
  } catch (error: any) {
    console.error(error.message);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(408).json(response).end();
    return;
  }
};
