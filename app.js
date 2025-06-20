const mongoose = require('mongoose');
const express = require ('express');
const {connect} = require('./db/connection')
const auth = require('./middlewares/auth');
const taskModel = require('./models/task');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3000

app.use (express.json())

app.set('view engine', 'ejs');


connect();




app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", auth.verifyToken, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = req.user;

    const tasks = await taskModel.find({ user_id: user_id });

    // const users = await userModel.find({req.body.first_name })
    // console.log(articles)
    res
      .status(200)
      .render("dashboard", { user_id, user,  tasks, date: new Date() });
  } catch (err) {
    return res.json(err);
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



