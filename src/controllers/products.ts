import { Request, Response } from "express";
import { executeSql } from "../utils/executeSql";
import { IResponseData } from "../utils/IResponseData";

/**
 * @type POST
 * @route /public/fetchProducts
 */
export const fetchProducts = async(req:Request,res:Response) => {
    let response:IResponseData;
    const {limit} = req.body;
    try{
        if(limit > 100 || !limit) throw new Error('Invalid limit');
        const products = await executeSql(`
        SELECT PRODUCT_ID,
        CATEGORY_ID,
        PRODUCT_NAME,
        PRODUCT_IMAGE,
        QUANTITY,
        CREATED_ON,
        UPDATED_ON,
        STATUS,
        PRICE,
        DELIVERY_PRICE,
        PRODUCT_DESC,
        GENDER
        FROM PUBLIC.BAZAAR_PRODUCTS
        LIMIT($1);
        `,[limit]);
        if(!products.rows[0]) throw new Error('No products available');
        response = {
            message: 'Products fetched successfully',
            status: true,
            data: products.rows 
        }
        res.status(201).json(response).end();
        return;
    }
    catch(error:any){
        response = {
            message:error.message,
            status:false,
            data:false
        }
        res.status(401).json(response).end();
        return;
    }
}

/**
 * @type GET
 * @route /public/productDetail
 */
export const productDetail = async(req:Request,res:Response) => {
    let response:IResponseData;
    const productId = req.query.productId;
    try{
        const products = await executeSql(`
        SELECT PRODUCT_ID,
        CATEGORY_ID,
        PRODUCT_NAME,
        PRODUCT_IMAGE,
        QUANTITY,
        CREATED_ON,
        UPDATED_ON,
        STATUS,
        PRICE,
        DELIVERY_PRICE,
        PRODUCT_DESC,
        GENDER
        FROM PUBLIC.BAZAAR_PRODUCTS
        WHERE PRODUCT_ID = $1;
        `,[productId]);
        if(!products.rows[0]) throw new Error('No product found');
        response = {
            message: 'Product fetched successfully',
            status: true,
            data: products.rows[0]
        }
        res.status(201).json(response).end();
        return;
    }
    catch(error:any){
        console.log(error);
        response = {
            message:error.message,
            status:false,
            data:false
        }
        res.status(401).json(response).end();
        return;
    }
}