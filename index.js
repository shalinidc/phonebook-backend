const express = require('express');
const app = express();

app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        id: 1
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        id: 2
    },
    {
        name: "Venla Ruuska",
        phone: "040-432342",
        id: 3
    },
]

const contactCount = persons.length;
const date = new Date();

const getContact = (id) => {
    const contactInfo = persons.find(p => {
        return p.id === id;
    });

    if(contactInfo){
        return contactInfo;
    }else return false;
}

const getId = () => {
    const maxId = Math.max(...persons.map(p => p.id));
    const id = maxId + 1;
    return id;
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/info', (req,res) => {
    res.send(`<h4>Phonebook has total of ${contactCount} contacts</h4><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const contact = getContact(id);
    console.log(contact);
    if(!contact){
        return res.status(404).json({
            error: 'No contact'
        })
    }
    res.json(contact);
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    persons = persons.map(p => p.id !== id);

    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const contact = req.body;

    if(!contact.name || !contact.number){
        return res.status(404).json({'error': 'contact not found'});
    }

    const person = {
        name: contact.name,
        number: contact.phone,
        id: getId()
    }

    const duplicate = persons.find(p => p.name === person.name);

    if(duplicate){
        return res.status(404).json({'error': 'Contact name should be unique'});
    }

    persons = persons.concat(person);
    res.json(contact);
})

const port = 3001;
app.listen(port);
console.log('Port running on 3001');
