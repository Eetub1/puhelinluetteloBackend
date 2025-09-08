const express = require("express")
const app = express()
const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')

app.use(cors())

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send("Moro")
})

app.get("/info", (request, response) => {
    response.send(
        `Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.post("/api/persons", (request, response) => {
    const name = request.body.name
    const number = request.body.number

    if (!name || !number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    const doesNameExist = persons.some(person => person.name === name)
    if (doesNameExist) {
        return response.status(400).json({ 
            error: 'name already exists!' 
        })
    }

    newPerson = {
        "id": Math.floor(Math.random() * 100000).toString(),
        "name": name,
        "number": number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//tän ois tarvinnu tehä näköjää vasta kohdassa 3.17??
//tässä sain puhelinnumeron muutoksen toimimaan!
/*app.put("/api/persons/:id", (request, response) => {
    const obj = request.body
    //console.log(obj)
    persons = persons.filter(person => person.name !== obj.name).concat(obj)
    response.json(persons)
})*/

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})