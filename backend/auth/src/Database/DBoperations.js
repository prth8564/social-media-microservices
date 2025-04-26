import { client } from "./DBclient.js";
export async function getUser(userName){
    try{
    const users = await client.query(`SELECT * from auth WHERE userName=$1`,[userName]);
    return users.rows[0];
    }
    catch(err){
        throw err;
    }
}

export async function createUser(userName,password){
    try{
    const res = await client.query(`INSERT INTO auth (userName,password) VALUES ($1,$2)`,[userName,password]);
    console.log(res);
    return;
    }
    catch(err){
        throw err;
    }
}