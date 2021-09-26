import { dbQuery } from "../libs/database"

export const executeSql = async(query:string,values:any = []) => {
    console.log('--SQL ',query);
    console.log('--SQL values ',values);
    return await dbQuery(query,values);
}