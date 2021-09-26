import { executeSql } from "./executeSql";

export const findUserByToken = async(param:string) => {
    const token = param.split(" ")[1];
    const {rows} = await executeSql('SELECT user_id from bazaar_tokens where token = $1',[`${token}`])
    if(rows) return rows[0].user_id;
    else return 0;
}