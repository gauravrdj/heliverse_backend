const zod=require('zod');
const {user}=require('./db')
const createUserSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string().email(),
    gender:zod.string(),
    avatar:zod.string().optional(),
    domain:zod.string().optional(),
    available:zod.boolean().optional().default(true)
});



const createUser=async (req,res,next)=>{
  const data=req.body;

  try{
     const validate=await createUserSchema.safeParse(data);
     if(!validate.success){
        res.json({
            msg:"Invalid Input",
        })
     }
     else{
     const alreadyExist=await user.findOne({
        
            email:data.email,
        
     });
     if(alreadyExist){
         res.json({
            msg:"user already exist",
         })
     }
     else{
        await next();
     }
    }
     

  }
  catch(e){
    console.log(e);
   res.json({
    
    msg: "some error while zod validation"
   })
  }

}

module.exports={
    createUser,
}