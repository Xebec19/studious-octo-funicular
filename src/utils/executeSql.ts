import { dbQuery } from "../connections/database"

export const executeSql = async(query:string,values:any = []) => {
    console.log(query);
    return await dbQuery(query,values);
}