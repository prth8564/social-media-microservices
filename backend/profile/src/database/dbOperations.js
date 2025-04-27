import { client } from "./dbClient.js";
export async function getUser(userName){
    try{
    const user = await client.query(`SELECT * from users WHERE userName=$1`,[userName]);
    return user.rows[0];
    }
    catch(err){
        throw err;
    }
}

export async function insertUser(userName,password){
    try{
    const res = await client.query(`INSERT INTO auth (userName,password) VALUES ($1,$2)`,[userName,password]);
    console.log(res);
    return;
    }
    catch(err){
        throw err;
    }
}

/*
CREATE TABLE profiles (
userName VARCHAR(255),
	age integer,
	instruments text[],
	country text,
	city text
)
*/