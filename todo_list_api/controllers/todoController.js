const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');

/**
 * @desc For create task
 * @route /api/task
 * @access Public
 */

exports.createTask = asyncHandler(async (req, res) => {
    const {task, active} = req.body
    const todo = await Todo.create({task, active});
    res.status(201).json({
        success: true,
        data: todo,
        message: 'Task is created succesfully'
    })
})

/**
 * @desc For update task
 * @route /api/task/:id
 * @access Public
 */

 exports.updateTask = asyncHandler(async (req, res) => {
    const {task, active} = req.body
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        existTask.task = task;
        existTask.active = active
        const updateTask = await existTask.save();
        res.status(200).json({
            success: true,
            data: updateTask,
            message: 'Task is updated success'
        })
    }
    else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Something went wrong (Task is not found)'
        })
    }
})


/**
 * @desc For delete task
 * @route /api/task/:id
 * @access Public
 */

 exports.deleteTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        await existTask.remove();
        res.status(200).json({
            success: true,
            message: 'Task is deleted success'
        })
    }
    else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Something went wrong (Task is not found)'
        })
    }
})


/**
 * @desc For single (1) task
 * @route /api/task/:id
 * @access Public
 */

 exports.getSingleTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id : req.params.id})
    if(existTask){
        res.status(200).json({
            success: true,
            data: existTask,
            message: 'Task Succesfully Called'
        })
    }
    else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Something went wrong (Task is not found)'
        })
    }
})


/**
 * @desc For get all task
 * @route /api/task
 * @access Public
 */

 exports.getAllTasks = asyncHandler(async (req, res) => {
    const allTasks = await Todo.find({})
    if(allTasks){
        res.status(200).json({
            success: true,
            data: allTasks,
            message: 'All Tasks are Succesfully Called'
        })
    }
    else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Something went wrong (Task is not found)'
        })
    }
})
