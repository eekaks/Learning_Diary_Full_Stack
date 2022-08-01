const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', (req, res) => {
	Task.find({}).then(tasks => {
		res.json(tasks)
	})
})

tasksRouter.get('/:id', (req, res, next) => {
	Task.findById(req.params.id).then(task => {
		if (task) {
			res.json(task)
		} else {
			res.status(404).end()
		}
	})
		.catch(error => next(error))
})

/* eslint-disable no-unused-vars */

tasksRouter.delete('/:id', (req, res, next) => {
	Task.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

/* eslint-enable no-unused-vars */

tasksRouter.post('/', (req, res, next) => {

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

	task.save().then(savedTask => {
		res.json(savedTask)
	})
		.catch(error => next(error))
})

tasksRouter.put('/:id', (req, res, next) => {
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
	Task.findByIdAndUpdate(req.params.id, task, { new: true })
		.then(updatedTask => {
			res.json(updatedTask)
		})
		.catch(error => next(error))
})

module.exports = tasksRouter