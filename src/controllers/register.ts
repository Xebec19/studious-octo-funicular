import { Request, Response } from "express";
import { executeSql } from "../utils/executeSql";
import { IResponseData } from "../utils/IResponseData";

/**
 * @route /public/register
 */
export const register = async(req:Request,res:Response) => {
    let response:IResponseData;
    const {firstName,lastName,email,phone,password} = req.body;
    try{
        const {rows} = await executeSql('SELECT COUNT(USER_ID) FROM BAZAAR_USERS WHERE LOWER(EMAIL) = LOWER($1)',[email])
        if(rows[0]){
            throw new Error('User already exists');
        };
        await executeSql(`
        INSERT INTO PUBLIC.BAZAAR_USERS(
            FIRST_NAME,
            LAST_NAME,
            EMAIL,
            PHONE,
            PASSWORD)
            VALUES ($1, $2, $3, $4, $5) RETURNING USER_ID;
        `,[firstName,lastName,email,phone,password]);
        response = {
            message:"User registered successfully",
            status:true,
            data: true
        }
        res.status(201).json(response).end();
    }
    catch(error:any){
        console.log(error.message);
        response = {
            message:error.message,
            status:false,
            data:false
        }
        res.status(401).json(response).end();
        return;
    }
}