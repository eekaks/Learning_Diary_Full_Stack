const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://elaine:${password}@cluster0.okrec.mongodb.net/learningDiary?retryWrites=true&w=majority`

mongoose.connect(url)

const topicSchema = new mongoose.Schema({
  title: String,
  description: String,
  estimatedTimeToMaster: Number,
  timeSpent: Number,
  source: String,
  startLearningDate: Date,
  inProgress: Boolean,
  completionDate: Date
})

const Topic = mongoose.model('Topic', topicSchema)

const topic = new Topic({
    title: "This is another test title",
    description: "This is another test description",
    estimatedTimeToMaster: 10,
    timeSpent: 0,
    source: "No sources",
    startLearningDate: "2022-07-21T11:38:51.92",
    inProgress: true,
    completionDate: null
})

topic.save().then(result => {
  console.log('topic saved!')
  mongoose.connection.close()
})

Topic.find({}).then(result => {
    result.forEach(topic => {
        console.log(topic)
    })
    mongoose.connection.close()
})