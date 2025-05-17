import { deleteRow } from "../database/dbOperations.js";
export async function deleteProfile(req,res){
    try{
    const userName = req.query.userName;
    if(!userName){
        return res.status(400).json({
            success:false,
            message:"userName not found nothing to delete"
        });
    }
    await deleteRow(userName);
    return res.status(200).json({
        success:true,
        message:"deleted"
    });
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Error while deleting profile"
    });
}
}