const express = require('express'); 
const { create, deleteTask, updateTask } = require('../controllers/taskController');
const verifyToken = require('../middlewares/auth');
const taskRouter = express.Router();

taskRouter.post('/create', verifyToken, create);
taskRouter.delete('/delete/:id', verifyToken, deleteTask);
taskRouter.put('/update/:id', verifyToken, updateTask);

module.exports = taskRouter