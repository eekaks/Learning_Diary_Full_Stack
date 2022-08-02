const topicsRouter = require('express').Router()
const Topic = require('../models/topic')
const Task = require('../models/task')

topicsRouter.get('/', async (req, res) => {
	const topics = await Topic.find({})
	res.json(topics)
})

topicsRouter.get('/:id', async (req, res) => {
	const topic = await Topic.findById(req.params.id)
	if (topic) {
		res.json(topic)
	} else {
		res.status(404).end()
	}
})

/* eslint-disable no-unused-vars */

topicsRouter.delete('/:id', async (req, res) => {
	await Topic.findByIdAndRemove(req.params.id)
	await Task.deleteMany( { topic: req.params.id } )
	res.status(204).end()
})

/* eslint-enable no-unused-vars */

topicsRouter.post('/', async (req, res) => {

	const body = req.body

	if (body.title === undefined) {
		return res.status(400).json({ error: 'content missing' })
	}

	const topic = new Topic({
		title: body.title,
		description: body.description,
		estimatedTimeToMaster: body.estimatedTimeToMaster,
		timeSpent: body.timeSpent,
		source: body.source,
		startLearningDate: body.startLearningDate,
		inProgress: body.inProgress,
		completionDate: body.completionDate
	})
	const savedTopic = await topic.save()
	res.status(201).json(savedTopic)
})

topicsRouter.put('/:id', async (req, res) => {
	const updateRequest = req.body
	const topic = {
		title: updateRequest.title,
		description: updateRequest.description,
		estimatedTimeToMaster: updateRequest.estimatedTimeToMaster,
		timeSpent: updateRequest.timeSpent,
		source: updateRequest.source,
		startLearningDate: updateRequest.startLearningDate,
		inProgress: updateRequest.inProgress,
		completionDate: updateRequest.completionDate
	}
	const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, topic, { new: true })
	res.json(updatedTopic)
})

module.exports = topicsRouter