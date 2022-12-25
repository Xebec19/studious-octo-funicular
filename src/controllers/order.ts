import { Request, Response } from "express";
import { IResponseData } from "../models/IResponseData";
import { executeSql } from "../utils/executeSql";
import { findUserByToken } from "../utils/getUserFromToken";
import { calcTotal } from "../utils/calcTotal";
import { nanoid } from "nanoid/async";
import instance from "../libs/razorInstance";
import cryto from "crypto";
import { razorSecret } from "../environment";
/**
 * @type POST
 * @access PRIVATE
 * @route /order/checkout
 */
export const checkout = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const { razorpay_order_id, razorpay_signature, razorpay_payment_id, email, address } =
      req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !address)
      throw new Error("Invalid arguments");
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const signature = cryto
      .createHmac("sha256", `${razorSecret}`)
      .update(body.toString())
      .digest("hex");
    if (signature !== razorpay_signature)
      throw new Error("Signature did'nt match");
    const token = req.headers["authorization"];
    const userId = await findUserByToken(token);
    //await executeSql(`BEGIN`);
    const cartId = await executeSql(
      `
      SELECT CART_ID
      FROM PUBLIC.BAZAAR_CARTS BC
      LEFT JOIN BAZAAR_USERS BU ON BU.USER_ID = BC.USER_ID
      WHERE BU.USER_ID =
		  $1
      `,
      [userId]
    );
    const orderId = await (await nanoid(15)).toUpperCase();
    await calcTotal(cartId.rows[0].cart_id);
    const cartSummary = await executeSql(
      `
    SELECT cart_id, user_id, price, delivery_price,total
	  FROM public.bazaar_carts WHERE cart_Id = $1;
    `,
      [cartId.rows[0].cart_id]
    );
    const orderDetails = await executeSql(
      `
    INSERT INTO public.bazaar_order(
      order_id, user_id, price, delivery_price, total, email, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id;
    `,
      [
        orderId + '',
        userId,
        +cartSummary.rows[0].price,
        +cartSummary.rows[0].delivery_price,
        +cartSummary.rows[0].total,
        email,
        address
      ]
    );
    const cartItems = await executeSql(
      `SELECT cd_id, cart_id, product_id, product_price, quantity, delivery_price
        FROM public.bazaar_cart_details WHERE cart_id = $1;`,
      [cartId.rows[0].cart_id]
    );
    setTimeout(async() => {
      await Promise.all(
        cartItems.rows.map(async (value: any, index: number) => {
          return await executeSql(
            `
          INSERT INTO public.bazaar_order_details(
            order_id, product_id, product_price, quantity, delivery_price)
            VALUES ($1, $2, $3, $4, $5);
          `,
            [
              orderDetails.rows[0].order_id + '',
              cartItems.rows[index].product_id,
              +cartItems.rows[index].product_price,
              cartItems.rows[index].quantity,
              +cartItems.rows[index].delivery_price,
            ]
          );
        })
      );
      await executeSql(
        `
      DELETE FROM public.bazaar_carts WHERE cart_id = $1;
      `,
        [cartId.rows[0].cart_id]
      );
      await executeSql(
        `
      DELETE FROM public.bazaar_cart_details where cart_id = $1;
      `,
        [cartId.rows[0].cart_id]
      );
      //await executeSql("COMMIT");
      response = {
        message: "order generated",
        status: true,
        data: orderId,
      };
      res.status(201).json(response).end();
      return;
    },1500)
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
    };
    //await executeSql(`ROLLBACK`);
    res.status(406).json(response).end();
    return;
  }
};

export const createOrder = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    let { amount } = req.body;
    amount = +amount.toFixed();
    console.log(amount);
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: await (await nanoid(15)).toUpperCase(),
    };
    const order = await instance.orders.create(options);
    if (!!!order) throw new Error("--error while creating order");
    response = {
      message: "Order created",
      status: true,
      data: order,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
    response = {
      message: error.message,
      status: false,
    };
    res.status(406).json(response).end();
    return;
  }
};
