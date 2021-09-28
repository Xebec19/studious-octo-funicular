import { Request, Response } from "express";
import { calcTotal } from "../utils/calcTotal";
import { executeSql } from "../utils/executeSql";
import { getCart } from "../utils/getCart";
import { findUserByToken } from "../utils/getUserFromToken";
import { IResponseData } from "../utils/IResponseData";

/**
 * @type POST
 * @access PRIVATE
 * @route /cart/edit_cart
 */
export const editCart = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { cartId, cartDetailsId, qty } = req.body;
  try {
    if (!cartDetailsId || !qty) {
      throw new Error("Incomplete parameters");
    }
    await executeSql(
      `
    UPDATE PUBLIC.BAZAAR_CART_DETAILS
    SET QUANTITY = $1
    WHERE CD_ID = $2;`,
      [qty, cartDetailsId]
    );
    await calcTotal(cartId);
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

/**
 * @type POST
 * @access PRIVATE
 * @route /cart/read_cart
 */
export const readCart = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    let cartId;
    const token = req.headers["authorization"];
    if (!token) throw new Error("Token not present");
    const userId = await findUserByToken(token);
    cartId = await getCart(userId);
    if (!cartId) throw new Error("No cart id found");
    const cartDetails = await executeSql(
      `
    SELECT CD_ID,
    CART_ID,
    PRODUCT_ID,
    PRODUCT_PRICE,
    QUANTITY,
    DELIVERY_PRICE
    FROM PUBLIC.BAZAAR_CART_DETAILS
    WHERE CART_ID = $1;
    `,
      [cartId]
    );
    const cartSummary = await executeSql(
      `
      SELECT * FROM BAZAAR_CARTS
      WHERE CART_ID = $1
      `,
      [cartId]
    );
    if (!cartDetails) {
      throw new Error("No item in cart");
    }
    // return cartId;
    response = {
      message: "User's cart fetched",
      status: true,
      data: {
        cartSummary: cartSummary.rows[0],
        cartItems: cartDetails.rows,
      },
    };
    res.status(201).json(response).end();
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

/**
 * @type POST
 * @route /cart/remove_item
 */
export const removeItem = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const { cartDetailsId, cartId } = req.body;
    if (!cartDetailsId || !cartId) throw new Error("Invalid parameters");
    const token = req.headers["authorization"];
    const userId = await findUserByToken(token);
    const checkCart = await executeSql(
      `
    SELECT BCD.CD_ID FROM BAZAAR_CART_DETAILS BCD LEFT JOIN BAZAAR_CARTS BC ON BC.CART_ID = BCD.CART_ID LEFT JOIN BAZAAR_USERS BU ON BC.USER_ID = BU.USER_ID  
    WHERE BU.USER_ID = $1 AND BC.CART_ID = $2 AND BCD.CD_ID = $3;
    `,
      [userId, cartId, cartDetailsId]
    );
    if (!checkCart.rows[0].cd_id) throw new Error("Cart not found");
    await executeSql(
      `
    DELETE FROM BAZAAR_CART_DETAILS
    WHERE CD_ID = $1;
    `,
      [cartDetailsId]
    );
    await calcTotal(cartId);
    response = {
      message: "Data deleted successfully",
      status: true,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    response = {
      message: error.message,
      status: false,
    };
    res.status(402).json(response).end();
    return;
  }
};

/**
 * @type POST
 * @access PRIVATE
 * @route /cart/add_item
 */
export const addToCart = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { productId, qty } = req.body;
  try {
    const token = req.headers["authorization"];
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
    const cartId = await getCart(userId);
    let cartDetailId;
    const cartDetailsStatus = await executeSql(
      `WITH findCartDetail as (select (case 
      when count(cart_id) > 0 then 'Present' 
      when count(cart_id) = 0 then 'absent' END) status 
  from bazaar_cart_details where cart_id = $1)
  SELECT * from findCartDetail;`,
      [cartId]
    );
    if (cartDetailsStatus.rows[0].status === "absent") {
      cartDetailId = await executeSql(
        `INSERT INTO public.bazaar_cart_details(
                cart_id, product_id, product_price, quantity, delivery_price)
                VALUES ($1, $2, $3, $4, $5) RETURNING cart_id;`,
        [
          cartId,
          product.rows[0].product_id,
          product.rows[0].price,
          qty,
          product.rows[0].delivery_price,
        ]
      );
    } else {
      cartDetailId = await executeSql(
        "SELECT CD_ID,QUANTITY FROM BAZAAR_CART_DETAILS WHERE PRODUCT_ID = $1 AND CART_ID = $2",
        [product.rows[0].product_id, cartId]
      );
      const updatedQty = +cartDetailId.rows[0].quantity + qty;
      await executeSql(
        `update bazaar_cart_details set quantity = $1 where cd_id = $2`,
        [updatedQty, cartDetailId.rows[0].cd_id]
      );
    }
    await calcTotal(cartId);
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
