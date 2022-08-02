const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', async (req, res) => {
	const tasks = await Task.find({})
		res.json(tasks)
})

tasksRouter.get('/:id', async (req, res) => {
	const task = await Task.findById(req.params.id)
		if (task) {
			res.json(task)
		} else {
			res.status(404).end()
		}
})

/* eslint-disable no-unused-vars */

tasksRouter.delete('/:id', async (req, res) => {
	await Task.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

/* eslint-enable no-unused-vars */

tasksRouter.post('/', async (req, res) => {

	const body = req.body

	if (body.title === undefined) {
		return res.status(400).json({ error: 'content missing' })
	}

	const task = new Task({
		topic: body.topic,
		title: body.title,
		description: body.description,
		deadline: body.deadline,
		priority: body.priority,
		done: body.done,
		notes: body.notes
	})
	const savedTask = await task.save()
	res.status(201).json(savedTask)
})

tasksRouter.put('/:id', async (req, res) => {
	const updateRequest = req.body
	const task = {
		topic: updateRequest.topic,
		title: updateRequest.title,
		description: updateRequest.description,
		deadline: updateRequest.deadline,
		priority: updateRequest.priority,
		done: updateRequest.done,
		notes: updateRequest.notes
	}
	const updatedTask = await Task.findByIdAndUpdate(req.params.id, task, { new: true })
	res.json(updatedTask)
})

module.exports = tasksRouter