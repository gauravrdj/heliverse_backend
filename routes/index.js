const express=require('express');
const {userRouter}=require('./user')
const {teamRouter}=require('./team')

const router=express.Router();

router.use('/users', userRouter);
router.use('/team', teamRouter);


module.exports={
    mainRouter:router,
}