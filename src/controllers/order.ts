import { Request, Response } from "express";
import { IResponseData } from "../models/IResponseData";
import { executeSql } from "../utils/executeSql";
import { v1 as uuidv1 } from 'uuid';

export const checkout = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    const cartId = await executeSql(`
      SELECT CART_ID
      FROM PUBLIC.BAZAAR_CARTS BC
      LEFT JOIN BAZAAR_USERS BU ON BU.USER_ID = BC.USER_ID
      WHERE BU.USER_ID =
		  (SELECT USER_ID
			FROM BAZAAR_TOKENS
			WHERE TOKEN = '$1');
      `,[token]);
      const orderId = uuidv1();
      
      return;
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
    };
    res.status(406).json(response).end();
    return;
  }
};
