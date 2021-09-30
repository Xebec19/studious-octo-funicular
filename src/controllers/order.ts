import { Request, Response } from "express";
import { IResponseData } from "../models/IResponseData";
import { executeSql } from "../utils/executeSql";
import { findUserByToken } from "../utils/getUserFromToken";
import { calcTotal } from "../utils/calcTotal";
import { nanoid } from 'nanoid/async'
/**
 * @type GET
 * @access PRIVATE
 * @route /order/checkout
 */
export const checkout = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const token = req.headers["authorization"];
    const userId = await findUserByToken(token);
    await executeSql(`BEGIN`);
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
    await executeSql(
      `
    INSERT INTO public.bazaar_order(
      order_id, user_id, price, delivery_price, total)
      VALUES ($1, $2, $3, $4, $5);
    `,
      [
        orderId,
        userId,
        cartSummary.rows[0].price,
        cartSummary.rows[0].delivery_price,
        cartSummary.rows[0].total,
      ]
    );
    const cartItems = await executeSql(
      `SELECT cd_id, cart_id, product_id, product_price, quantity, delivery_price
        FROM public.bazaar_cart_details WHERE cart_id = $1;`,
      [cartId.rows[0].cart_id]
    );
    await Promise.all(
      cartItems.rows.map(async (value: any, index: number) => {
        return await executeSql(
          `
        INSERT INTO public.bazaar_order_details(
          order_id, product_id, product_price, quantity, delivery_price)
          VALUES ($1, $2, $3, $4, $5);
        `,
          [
            orderId,
            cartItems.rows[index].product_id,
            cartItems.rows[index].product_price,
            cartItems.rows[index].quantity,
            cartItems.rows[index].delivery_price,
          ]
        );
      })
    );
    await executeSql(`
    DELETE FROM public.bazaar_carts WHERE cart_id = $1;
    `,[cartId.rows[0].cart_id]);
    await executeSql(`
    DELETE FROM public.bazaar_cart_details where cart_id = $1;
    `,[cartId.rows[0].cart_id]);
    await executeSql('COMMIT');
    response = {
      message: 'order generated',
      status: true,
      data: orderId
    }
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
    };
    await executeSql(`ROLLBACK`);
    res.status(406).json(response).end();
    return;
  }
};
