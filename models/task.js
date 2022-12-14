const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
	topic: Object,
	title: String,
	description: String,
	deadline: Date,
	priority: Number,
	done: Boolean,
	notes: String
})

taskSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Task', taskSchema)