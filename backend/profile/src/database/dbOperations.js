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
        console.log(typeof age,typeof gender,typeof instruments,typeof country,typeof city,typeof userName);
        const values = [age,gender,instruments,country,city,userName];
        console.log(values);
        const query = `
  UPDATE profiles SET
      age = COALESCE($1, age),
      gender = COALESCE($2,gender),
      instruments = COALESCE($3,instruments),
      country = COALESCE($4,country),
      city = COALESCE($5,city)
      where username = $6
`;
        const res = await client.query(query,values);
        console.log(res.rows);
        if(res.rowCount == 0){
            throw new Error("No rows updated");
        }
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