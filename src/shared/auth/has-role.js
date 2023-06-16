const hasRole=(roles)=>{
    return  (req,res,next)=>{
        
        const {role}=req.body
        console.log(req.user);

        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                error:"Sizga bu yo'lga ruxsat berilmagan"
            })
        }
        next()

    }
}
module.exports=hasRole