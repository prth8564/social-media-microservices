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

export async function insertRow(userName){
    try{
    const res = await client.query(`INSERT INTO profiles (userName) VALUES ($1)`,[userName]);
    console.log(res);
    return;
    }
    catch(err){
        throw err;
    }
}
export async function updateRow(age,gender,instruments,country,city,userName){
        const values = [age,gender,instruments,country,city,userName];
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
  WHERE userName = $6
`;
        await client.query(query,values);
        return;
}
export async function deleteRow(userName){
  console.log(userName);
  const query = `DELETE from profiles where username=($1)`;
  const values=[userName];
  const res = await client.query(query,values);
  if(res.rowCount == 0){
    throw new Error("No rows deleted");
  }
  return;
}

export async function findRows(instruments,city,gender,age){
  try{
  const values = [instruments, city,gender,age];
    const query =`
    SELECT * from profiles
    WHERE 
    ($1::text[] is NULL OR instruments && $1)  
    AND
    ($2 is NULL OR city =$2)
    AND
    ($3 is NULL OR gender = $3)
    AND
    ($4 is NULL OR age = $4)
    `
    const res = await client.query(query,values)
    return res;
  }
  catch(err){
    throw err;
  }
}