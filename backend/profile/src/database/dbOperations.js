import { client } from "./dbClient.js";
export async function getUser(userName){
    try{
    const user = await client.query(`SELECT * from profiles WHERE userName=$1`,[userName]);
    return user.rows[0];
    }
    catch(err){
        throw err;
    }
}

export async function inserNewUser(userName){
    try{
    const res = await client.query(`INSERT INTO profiles (userName) VALUES ($1)`,[userName]);
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