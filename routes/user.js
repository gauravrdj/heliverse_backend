const express=require('express');
const {data} = require('../data')
const {user}=require('../db')
const {createUser}=require('../middleware')

const router=express.Router();

router.get('/', async(req,res)=>{
    const newFilter=req.query.filter || "";
    const newDomain=req.query.domain
    const newAvailable=req.query.available
    const newGender=req.query.gender
    
    try{
    const allUsers=await user.find({
        
    $and: [
        {
            $or: [
                { firstName: { "$regex": newFilter, "$options": "i" } },
                { lastName: { "$regex": newFilter, "$options": "i" } }
            ]
        },
        newDomain ? { domain: { "$regex": newDomain, "$options": "i" } } : {},
        newAvailable ? { available: { "$regex": newAvailable, "$options": "i" } } : {},
       newGender ? { gender: { "$regex": newGender, "$options": "i" } } : {}
    ]
})
    
    res.json({
        allUsers,
    })
    }
    catch(e){
      res.json({
        msg:"Error while fetching all users"
      })
    }
    


})

router.get('/:id', async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await user.findOne({
        _id:id,
    })
    if(!data){
        res.json({
            msg: "user not exist"
        })
    }
    res.json({
        data,
    })
}
catch(e){
    res.json({
        msg:"error while getting user"
    })
}

})






router.post('/', createUser, async(req,res)=>{
 
    const data=req.body;
    try{
    const response=await user.create(data);
      res.json({
        msg: "user created successfully!",
      })
    }
    catch(e){
        res.json({
            msg: "some error while creating user"
        })
    }


})

router.put('/:id', async (req, res)=>{
    const updates=req.body;
    const id=req.params.id
    try{
    const updatedUser = await user.findOneAndUpdate({ _id: id }, updates, { new: true });
    res.json({
        msg: "Updated Successfully"
    })
}
catch(e){
    
    res.json({
        msg: "error while updating info"
    })
}
})

router.get('/delete/:id', async (req,res)=>{
    const id=req.params.id;
    try{
    await user.findOneAndDelete({
        _id:id
    })
    res.json({
        msg: "Deleted successfully"
    })
}
catch(e){
    
    res.json({
        msg:"error while deleting"
    })
}
})




module.exports={
    userRouter:router,
}