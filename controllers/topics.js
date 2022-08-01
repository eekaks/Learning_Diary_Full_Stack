const topicsRouter = require('express').Router()
const Topic = require('../models/topic')
const Task = require('../models/task')

topicsRouter.get('/', (req, res) => {
	Topic.find({}).then(topics => {
		res.json(topics)
	})
})

topicsRouter.get('/:id', (req, res, next) => {
	Topic.findById(req.params.id).then(topic => {
		if (topic) {
			res.json(topic)
		} else {
			res.status(404).end()
		}
	})
		.catch(error => next(error))
})

/* eslint-disable no-unused-vars */

topicsRouter.delete('/:id', (req, res, next) => {
	Topic.findByIdAndRemove(req.params.id)
		.then(result => {
			Task.deleteMany( { topic: req.params.id } )
			res.status(204).end()
		})
		.catch(error => next(error))
})

/* eslint-enable no-unused-vars */

topicsRouter.post('/', (req, res, next) => {

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

	topic.save().then(savedTopic => {
		res.json(savedTopic)
	})
		.catch(error => next(error))
})

topicsRouter.put('/:id', (req, res, next) => {
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
	Topic.findByIdAndUpdate(req.params.id, topic, { new: true })
		.then(updatedTopic => {
			res.json(updatedTopic)
		})
		.catch(error => next(error))
})

module.exports = topicsRouter