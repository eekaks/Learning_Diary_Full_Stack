require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Topic = require('./models/topic')
const Task = require('./models/task')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Learning Diary innit</h1>')
})

app.get('/topic', (req, res) => {
  Topic.find({}).then(topics => {
    res.json(topics)
  })
})

app.get('/topic/:id', (req, res, next) => {
    Topic.findById(req.params.id).then(topic => {
        if (topic) {
            res.json(topic)
        } else {
            res.status(404).end()
        } 
    })
    .catch(error => next(error))
})

app.delete('/topic/:id', (req, res, next) => {
    Topic.findByIdAndRemove(req.params.id)
        .then(result => {
            Task.deleteMany({topic: req.params.id})
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/topic', (req, res, next) => {

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

app.put('/topic/:id', (req, res, next) => {
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

app.get('/task', (req, res) => {
    Task.find({}).then(tasks => {
      res.json(tasks)
    })
  })
  
app.get('/task/:id', (req, res, next) => {
    Task.findById(req.params.id).then(task => {
        if (task) {
            res.json(task)
        } else {
            res.status(404).end()
        } 
    })
    .catch(error => next(error))
})
  
app.delete('/task/:id', (req, res, next) => {
    Task.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})
  
app.post('/task', (req, res, next) => {

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

app.put('/task/:id', (req, res, next) => {
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

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})