const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')


const user = new Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name:{
        type: String,
        required:true
    },
   password:{
       type:String
   }
})

const userModel= model('users', user)

model.exports={
    userModel
}