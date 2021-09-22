import { executeSql } from "./executeSql";
import { findUserByToken } from "./getUserFromToken"

export const calcTotal = async(token:string) => {
    const productsInCart = await executeSql(`SELECT BCD.PRODUCT_ID,BCD.PRODUCT_PRICE,BCD.QUANTITY,BCD.DELIVERY_PRICE
    FROM BAZAAR_CART_DETAILS BCD
    LEFT JOIN BAZAAR_CARTS BC ON BC.CART_ID = BCD.CART_ID
    WHERE BC.USER_ID = (SELECT USER_ID FROM BAZAAR_TOKENS WHERE TOKEN = $1);`,[`${token}`]);
    const total = productsInCart.rows.reduce((acc:number,el:any) => {
        return acc += (el.product_price*el.quantity) + el.delivery_price; 
    },0);
    if(total >= 0) return total;
    else false; 
}