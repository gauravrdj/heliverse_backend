const express=require('express');
const {mainRouter}=require('./routes/index')
const bodyParser=require('body-parser')
const cors=require('cors')
const {data} = require('./data')
const {user} =require('./db')
const app=express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.use("/api", mainRouter);




app.listen(3000, ()=>{
    console.log('Server started at http://localhost:3000');
});

