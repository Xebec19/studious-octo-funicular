import { Request, Response } from "express";
import { executeSql } from "../utils/executeSql";
import { IResponseData } from "../models/IResponseData";

/**
 * @type POST
 * @route /public/fetchProducts
 */
export const fetchProducts = async (req: Request, res: Response) => {
  let response: IResponseData;
  const limit = req.query.limit;
  try {
    const filter = req.query.filter;
    if (+limit! > 100 || !limit) throw new Error("Invalid limit");
    let url = "";
    let filterText = "";
    switch (filter) {
      case "trending":
        filterText += " ORDER BY ";
        break;
      default:
        filterText += " ORDER BY RANDOM() ";
        break;
    }
    url =
      `SELECT PRODUCT_ID,
      CATEGORY_ID,
      PRODUCT_NAME,
      PRODUCT_IMAGE,
      QUANTITY,
      PRICE,
      DELIVERY_PRICE,
      PRODUCT_DESC,
      GENDER
      FROM PUBLIC.BAZAAR_PRODUCTS` +
      filterText +
      ` LIMIT($1);`;
    const products = await executeSql(url, [limit]);
    if (!products.rows[0]) throw new Error("No products available");
    response = {
      message: "Products fetched successfully",
      status: true,
      data: products.rows,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
    return;
  }
};

/**
 * @type GET
 * @route /public/productDetail
 */
export const productDetail = async (req: Request, res: Response) => {
  let response: IResponseData;
  const productId = req.query.productId;
  try {
    const products = await executeSql(
      `
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
        `,
      [productId]
    );
    if (!products.rows[0]) throw new Error("No product found");
    response = {
      message: "Product fetched successfully",
      status: true,
      data: products.rows[0],
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
    return;
  }
};

/**
 * @type GET
 * @route /public/category
 */
export const fetchCategories = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    let sql = req.query.includeImg
      ? `select distinct on (bp.category_id) bp.category_id,
    bc.category_name ,
    bp.product_id,bp.product_name ,bp.product_image 
    from bazaar_products bp 
    left join bazaar_categories bc 
    on bc.category_id = bp.category_id 
    order by category_id;`
      : "select category_id,category_name from bazaar_categories order by category_id";

    const categories = await executeSql(sql);
    response = {
      message: "categories fetched successfully",
      status: true,
      data: categories.rows,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log("--error ", error.stack);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
    return;
  }
};
