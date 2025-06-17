const userModel = require("../models/users");
const jwt = require ("jsonwebtoken")
require("dotenv").config();

const signup = async(req,res) =>{
    const {username,password} = req.body;
    try{
        const userexists = await userModel.findOne({
            username:username,
        })
        if (userexists){
          return res.json({message:"User already exists"}) }
        const user = await userModel.create({
            username:username,
            password:password,

        });
        const secret = process.env.JWT_SECRET;
        const token = await jwt.sign(
            {username:user.username},
            secret
        );
        res.status(302).redirect("/login");
    } catch(error){
        console.log(error);}
   
}

const login = async(req,res) =>{
    const {username,password} = req.body;
      try {
    const user = await userModel.findOne({
      username: username,
    });
    if (!user) {
      return  res.status(404).redirect("/signup");

    }
    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
       return res.status(302).redirect("/unknown");

    }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
    console.log(error); 
    res.status(500).send("Internal Server Error");
  }
}

module.exports= {
    signup,
    login
}
