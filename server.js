
 // URK24CS1102
// JM Interior Studio - Backend

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient('mongodb://127.0.0.1:27017');
let projects;

app.get('/projects', async (req, res) => {
    const data = await projects.find().toArray();
    res.json(data);
});

app.post('/projects', async (req, res) => {
    const project = req.body;
    await projects.insertOne(project);
    res.send('Project added successfully');
});

app.put('/projects/:id', async (req, res) => {
    await projects.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send('Project updated successfully');
});

app.delete('/projects/:id', async (req, res) => {
    await projects.deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.send('Project deleted successfully');
});

async function startServer() {
    await client.connect();
    const db = client.db('JMInteriorDB');
    projects = db.collection('Projects');

    app.listen(5000, () => {
        console.log('JM Interior Studio server running on port 5000');
    });
}

startServer();
