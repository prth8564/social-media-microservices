import { findRows } from "../database/dbOperations.js";
export async function findMatches(req, res) {
    try{
        const{instruments,city,gender,age} = req.query;
        const filters ={
            instruments:instruments || null,
            city:city || null,
            gender:gender || null,
            age: parseInt(age) || null
        }
        const dbRes = await findRows(
            filters.instruments,
            filters.city,
            filters.gender,
            filters.age
        );
        if(dbRes.rowCount == 0){
            return res.status(200).json({
                success:true,
                message:"No mathes found based on your criteria",
                data:[]
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:`${dbRes.rows.length} Matches found`,
                data:dbRes.rows
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while finding matches"
        });
    }
}