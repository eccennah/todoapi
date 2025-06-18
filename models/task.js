const {Schema, model} = require('mongoose');


const task = new Schema({
    title:{type:string, required:true},
    user:{type:Schema.Types.ObjectId,ref:'user'},
    state:{
        type:String,
        default:'pending',
    }
    

})



const taskModel = model('task',task)

module.exports = {taskModel}