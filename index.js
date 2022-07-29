const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let topics = [
    {
        id: 1,
        title: "HTML",
        description: "Master the basics of HTML",
        estimatedTimeToMaster: 5,
        timeSpent: 0,
        source: "Google",
        startLearningDate: "2022-07-21T11:38:51.92",
        inProgress: true,
        completionDate: null
    },
    {
        id: 5,
        title: "CSS",
        description: "Master the basics of CSS",
        estimatedTimeToMaster: 10,
        timeSpent: 0,
        source: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        startLearningDate: "2022-07-27T10:02:50.777",
        inProgress: true,
        completionDate: null
    },
    {
        id: 6,
        title: "C#",
        description: "Master full stack .NET C# development",
        estimatedTimeToMaster: 90,
        timeSpent: 0,
        source: "https://awacademy.fi/",
        startLearningDate: "2022-07-27T10:03:38.16",
        inProgress: true,
        completionDate: null
    }
  ]

let tasks = [
    {
        id: 1,
        topic: 5,
        title: "Hover",
        description: "Learn the basics of how to deal with hover events",
        deadline: "2022-08-04T00:00:00",
        priority: 2,
        done: false,
        notes: "Enter your notes here"
    },
    {
        id: 2,
        topic: 5,
        title: "Padding",
        description: "Get an idea of how padding actually works",
        deadline: "2022-08-05T00:00:00",
        priority: 3,
        done: false,
        notes: "Enter your notes here"
    },
    {
        id: 3,
        topic: 5,
        title: "Display: flex",
        description: "Learn how to arrange elements in relation to each other",
        deadline: "2022-08-05T00:00:00",
        priority: 1,
        done: false,
        notes: "Enter your notes here"
    },
    {
        id: 4,
        topic: 1,
        title: "Input",
        description: "Learn how input boxes work and what features they have",
        deadline: "2022-08-05T00:00:00",
        priority: 2,
        done: true,
        notes: "Enter your notes here"
    },
    {
        id: 5,
        topic: 1,
        title: "Linking JS",
        description: "Learn how to link JS files to HTML pages and how they work together",
        deadline: "2022-08-05T00:00:00",
        priority: 1,
        done: false,
        notes: "some notes"
    },
    {
        id: 6,
        topic: 6,
        title: "Console app",
        description: "Learn how to make a UI for a console app",
        deadline: "2022-08-05T00:00:00",
        priority: 2,
        done: false,
        notes: "Enter your notes here"
    }
]

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Learning Diary innit</h1>')
})

app.get('/topic', (req, res) => {
  res.json(topics)
})

app.get('/topic/:id', (req, res) => {
    const id = Number(req.params.id)
    const topic = topics.find(topic => topic.id === id)

    if (topic) {
        res.json(topic)
    } else {
        res.status(404).end()
    }
})

app.delete('/topic/:id', (req, res) => {
    const id = Number(req.params.id)
    topics = topics.filter(topic => topic.id !== id)
    tasks = tasks.filter(task => task.topic !== id)
  
    res.status(204).end()
})

app.post('/topic', (req, res) => {

    const maxId = topics.length > 0
      ? Math.max(...topics.map(n => n.id)) 
      : 0
  
    const topic = req.body
    topic.id = maxId + 1
  
    topics = topics.concat(topic)
  
    res.json(topic)
})

app.put('/topic/:id', (req, res) => {
    const id = Number(req.params.id)
    const updateRequest = req.body
    const topic = topics.find(topic => topic.id === updateRequest.id)

    if (topic) {
        topic.id = updateRequest.id
        topic.title = updateRequest.title
        topic.description = updateRequest.description
        topic.estimatedTimeToMaster = updateRequest.estimatedTimeToMaster
        topic.timeSpent = updateRequest.timeSpent
        topic.source = updateRequest.source
        topic.startLearningDate = updateRequest.startLearningDate
        topic.inProgress = updateRequest.inProgress
        topic.completionDate = updateRequest.completionDate
    } else {
        res.status(404).end()
    }

    res.json(topic)
})

app.get('/task', (req, res) => {
    res.json(tasks)
})
  
app.get('/task/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find(task => task.id === id)

    if (task) {
        res.json(task)
    } else {
        res.status(404).end()
    }
})
  
app.delete('/task/:id', (req, res) => {
    const id = Number(req.params.id)
    tasks = tasks.filter(task => task.id !== id)

    res.status(204).end()
})
  
app.post('/task', (req, res) => {

    const maxId = tasks.length > 0
    ? Math.max(...tasks.map(n => n.id)) 
    : 0

    const task = req.body
    task.id = maxId + 1

    tasks = tasks.concat(task)

    res.json(task)
})

app.put('/task/:id', (req, res) => {
    const id = Number(req.params.id)
    const updateRequest = req.body
    const task = tasks.find(task => task.id === updateRequest.id)

    if (task) {
        task.id = updateRequest.id
        task.topic = updateRequest.topic
        task.title = updateRequest.title
        task.description = updateRequest.description
        task.deadline = updateRequest.deadline
        task.priority = updateRequest.priority
        task.done = updateRequest.done
        task.notes = updateRequest.notes
    } else {
        res.status(404).end()
    }

    res.json(task)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})