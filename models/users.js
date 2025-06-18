const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')


const user = new Schema({
   username:{type:String,required:true,unique:true},
   password:{type:String,required:true}
})

async function hashpassword(next){
    const user = this ;

    if (!user.isModified('password')) return next();

    try{
        const hash = await bcrypt.hash(user.password, 5);
        user.password = hash;
        next();

    } catch(err){
        next(err);
    }
}
userSchema.pre("save", hashpassword)

userSchema.methods.isValidPassword = async function (password) {

    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
    
}


const userModel=model('user', userSchema)

model.exports={
    userModel
}