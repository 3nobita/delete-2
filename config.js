const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
const connect = Mongoose.connect('mongodb+srv://bhavesh39shinde:aRvzjRW6BNZJZGB9@10k.3wfnndr.mongodb.net/?retryWrites=true&w=majority&appName=10k')

connect.then(()=>{
    console.log('mongodb connected')
})
.catch((error)=>{
    console.error(error)
})  

// create Mongoose.Schema

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Work:{
        type:[String],
        required:true
    }

})

const collection = new mongoose.model('allData',LoginSchema);
module.exports = collection