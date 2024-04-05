const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://gaurav_rdj:gaurav%402002S@firstcluster.66p7ced.mongodb.net/heliverse');

const userSchema=new mongoose.Schema({
   id:{
      type:Number,
      required:false
   },
    firstName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    avatar:{
        type:String,
        default:'https://robohash.org/veltemporibusitaque.png?size=50x50&set=set1',
        required:false,
    },
    domain:{
        type:String,
        required:false
    },
    available:{
        type:Boolean,
        default:true,
        required:false
    }
})

const user=mongoose.model('user', userSchema);

module.exports={
    user,
}