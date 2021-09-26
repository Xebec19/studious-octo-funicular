import { Request, Response } from "express";
import { calcTotal } from "./calcTotal";
import { executeSql } from "./executeSql";
import { IResponseData } from "./IResponseData";

export const getCart = async(userId:number) => {
    try{
        let cartId;
        const status = await executeSql(
            `WITH findCart as (select (case 
                when count(cart_id) > 0 then 'Present' 
                when count(cart_id) = 0 then 'absent' END) status 
            from bazaar_carts where user_id = $1)
            SELECT * from findCart;`,
            [userId]
          );
        if (status.rows[0].status === 'absent'){
          cartId = await executeSql(
            `INSERT INTO public.bazaar_carts(
                    user_id, price, delivery_price, total)
                    VALUES ($1,$2,$3,$4) RETURNING cart_id;`,
            [
              userId,
              0,
              0,
              0,
            ]
          );
        } else {
          cartId = await executeSql(
            "SELECT cart_id from bazaar_carts where user_id = $1",
            [userId]
          );
        }
        calcTotal(cartId.rows[0].cart_Id);
        return cartId.rows[0].cart_Id;
    }
    catch(error:any){
        console.log(error.message);
        return false;
    }
}