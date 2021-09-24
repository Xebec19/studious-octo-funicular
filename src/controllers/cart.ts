import { Request, Response } from "express";
import { executeSql } from "../utils/executeSql";
import { findUserByToken } from "../utils/getUserFromToken";
import { IResponseData } from "../utils/IResponseData";

/**
 * @type POST
 * @access PRIVATE
 * @route /cart/add_item
 */
export const addToCart = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { productId, qty } = req.body;
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) throw new Error("token not present");
    if (!productId || !qty) throw new Error("Invalid Parameters");
    const userId = await findUserByToken(token);
    if (!userId) throw new Error("No user found");
    let product = await executeSql(
      `SELECT product_id, category_id, product_name, product_image, quantity, created_on, updated_on, status, price, delivery_price, product_desc, gender
        FROM public.bazaar_products where product_id = $1 and status = 'active'`,
      [productId]
    );
    if (!product) {
      throw new Error("Product not available");
    }
    if (qty > product.rows[0].quantity) {
      throw new Error("Insufficient stock");
    }
    let userCartId;
    // cte
    const status = await executeSql(
        `WITH findCart as (select (case 
            when count(cart_id) > 0 then 'Present' 
            when count(cart_id) = 0 then 'absent' END) status 
        from bazaar_carts where user_id = $1)
        SELECT * from findCart;`,
        [userId]
      );
    if (status.rows[0].status === 'absent'){
      userCartId = await executeSql(
        `INSERT INTO public.bazaar_carts(
                user_id, price, delivery_price, total)
                VALUES ($1,$2,$3,$4) RETURNING cart_id;`,
        [
          userId,
          product.rows[0].price,
          product.rows[0].delivery_price,
          product.rows[0].price + product.rows[0].delivery_price,
        ]
      );
    } else {
      userCartId = await executeSql(
        "SELECT cart_id from bazaar_carts where user_id = $1",
        [userId]
      );
    }
    let cartDetailId;
    const cartDetailsStatus = await executeSql(`WITH findCart as (select (case 
      when count(cart_id) > 0 then 'Present' 
      when count(cart_id) = 0 then 'absent' END) status 
  from bazaar_carts where user_id = $1)
  SELECT * from findCart;`)
    if (
      
    ) {
      cartDetailId = await executeSql(
        `INSERT INTO public.bazaar_cart_details(
                cart_id, product_id, product_price, quantity, delivery_price)
                VALUES ($1, $2, $3, $4, $5) RETURNING cart_id;`,
        [
          userCartId.rows[0].cart_id,
          product.rows[0].product_id,
          qty,
          product.rows[0].delivery_price,
        ]
      );
    } else {
      cartDetailId = await executeSql(
        "SELECT CD_ID FROM BAZAAR_CART_DETAILS WHERE PRODUCT_ID = $1 AND CART_ID = $2",
        [product.rows[0].product_id, userCartId.rows[0].cart_id]
      );
      await executeSql(
        `update bazaar_cart_details set qty = $1 where cd_id = $2`,
        [qty, cartDetailId.rows[0].cd_id]
      );
    }
    response = {
      message: "Product added to cart successfully",
      status: true,
      data: cartDetailId.rows[0].cd_id,
    };
    res.status(201).json(response).end;
    return;
  } catch (error: any) {
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    console.log(error.message);
    res.status(401).json(response).end();
    return;
  }
};
