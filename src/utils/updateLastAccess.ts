import { NextFunction, Request, Response } from "express";
import { executeSql } from "./executeSql";

export const updateLastAccess = async(req:Request,res:Response,next:NextFunction) => {
    try{
    const token = req.headers['authorization']?.split(" ")[1];
    if(token){
        await executeSql(`
        UPDATE PUBLIC.BAZAAR_TOKENS
        SET last_access = now()
        WHERE TOKEN = $1 ;
        `,[token]);
    }
    }
    catch(error:any){
        console.log(error.message);
    }
    next();
}