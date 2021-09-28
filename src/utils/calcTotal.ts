import { executeSql } from "./executeSql";

// Func to calc total
export const calcTotal = async (cartId: number | string) => {
  try {
    if (!cartId) throw new Error("invalid parameters");
    // update product prices
    await executeSql(
      `UPDATE BAZAAR_CART_DETAILS BCD 
      SET PRODUCT_PRICE = (SELECT PRICE FROM BAZAAR_PRODUCTS BP 
                  WHERE BP.PRODUCT_ID = BCD.PRODUCT_ID),
      DELIVERY_PRICE = (SELECT DELIVERY_PRICE FROM BAZAAR_PRODUCTS BP
                WHERE BP.PRODUCT_ID = BCD.PRODUCT_ID)
      WHERE BCD.CART_ID = $1;`,
      [cartId]
    );
    // fetch all products in cart
    const cartDetails = await executeSql(
      ` SELECT BCD.PRODUCT_ID,BCD.PRODUCT_PRICE,BCD.QUANTITY,BCD.DELIVERY_PRICE FROM 
      BAZAAR_CART_DETAILS BCD
      WHERE CART_ID = $1;`,
      [cartId]
    );
    // calc their sum
    const total = cartDetails.rows.reduce((acc: number, ci: any) => {
      return (acc += +ci.product_price * ci.quantity + +ci.delivery_price);
    }, 0);
    const subtotal = cartDetails.rows.reduce((acc: number, ci: any) => {
      return (acc += +ci.product_price * +ci.quantity);
    }, 0);
    const delivery_price = await executeSql(
      `SELECT MAX(DELIVERY_PRICE) as DELIVERY_PRICE FROM BAZAAR_CART_DETAILS WHERE CART_ID = $1`,
      [cartId]
    );
    // update cart
    await executeSql(
      `UPDATE BAZAAR_CARTS SET TOTAL = $1, PRICE = $2, DELIVERY_PRICE = $3 WHERE CART_ID = $4`,
      [total, subtotal, +delivery_price.rows[0].delivery_price, cartId]
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
