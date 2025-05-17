import { deleteRow } from "../database/dbOperations.js";
export async function deleteProfile(req,res){
    const {userName} = req.body;
    await deleteRow(userName);
    return;
}