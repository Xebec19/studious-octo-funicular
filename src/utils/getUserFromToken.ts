import { executeSql } from "./executeSql";

export const findUserByToken = async(token:string) => {
    const {rows} = await executeSql('SELECT user_id from bazaar_tokens where token = $1',[`${token}`])
    if(rows)
    return rows[0].user_id;
    else return 0;
}