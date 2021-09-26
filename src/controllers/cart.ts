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
export const editCart = async (req:Request, res:Response) => {
  let response: IResponseData;
  const { cartId, cartDetailsId, qty} = req.body;
  try{
    if(!cartDetailsId || !qty){ throw new Error('Incomplete parameters')};
    await executeSql(`
    UPDATE PUBLIC.BAZAAR_CART_DETAILS
    SET QUANTITY = $1
    WHERE CD_ID = $2;`
    ,[qty,cartDetailsId]);
    await calcTotal(cartId);
  }
  catch(error:any){
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    console.log(error.message);
    res.status(401).json(response).end();
    return;
  }
}

/**
 * @type POST
 * @access PRIVATE
 * @route /cart/read_cart
 * todo wip
 */
export const readCart = async(req: Request, res: Response) => {
  let response: IResponseData;
  try{
    let cartId;
    const token = req.headers['authorization'];
    if(!token) throw new Error('Token not present');
    const userId = await findUserByToken(token);
    cartId = getCart(userId);
    const cartDetails = await executeSql(`
    SELECT CD_ID,
    CART_ID,
    PRODUCT_ID,
    PRODUCT_PRICE,
    QUANTITY,
    DELIVERY_PRICE
    FROM PUBLIC.BAZAAR_CART_DETAILS
    WHERE CART_ID = $1;
    `,[cartId]);
  // return cartId;
    response = {
      message: "User's cart fetched",
      status: true,
      data: cartDetails
    }
  }
  catch(error:any){
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    console.log(error.message);
    res.status(401).json(response).end();
    return;
  }
}

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
    const cartDetailsStatus = await executeSql(`WITH findCartDetail as (select (case 
      when count(cart_id) > 0 then 'Present' 
      when count(cart_id) = 0 then 'absent' END) status 
  from bazaar_cart_details where cart_id = $1)
  SELECT * from findCartDetail;`,[cartId]);
    if (cartDetailsStatus.rows[0].status === 'absent') {
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
    };
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
