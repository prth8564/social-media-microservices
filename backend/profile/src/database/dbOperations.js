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
export async function updateProfile(age,gender,instruments,country,city,username){
        const values = [age,gender,instruments,country,city,username];
        const query = `
  UPDATE profiles SET
    age = CASE
            WHEN age != $1 THEN $1
            ELSE age
          END,
    gender = CASE
              WHEN gender != $2 THEN $2
              ELSE gender
            END,
    instruments = CASE
                    WHEN instruments != $3 THEN $3
                    ELSE instruments
                  END,
    country = CASE
                WHEN country != $4 THEN $4
                ELSE country
              END,
    city = CASE
                WHEN city != $5 THEN $5
                ELSE city
           END
  WHERE username = $6
`;
        await client.query(query,values);
        return;
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