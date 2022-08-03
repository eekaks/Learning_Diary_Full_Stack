const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true
    },
    description: {
        type: String,
        minlength: 1,
        required: true
    },
    estimatedTimeToMaster: Number,
    timeSpent: Number,
    source: String,
    startLearningDate: {
        type: Date,
        required: true
    },
    inProgress: Boolean,
    completionDate: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		sortingid: mongoose.Schema.Types.ObjectId
})

topicSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Topic', topicSchema)