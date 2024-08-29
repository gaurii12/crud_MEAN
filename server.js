const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection 
mongoose.connect('mongodb://localhost:27017/User_data', {
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    completed:
    {
        type: Boolean,
        default: false
    },
});

const Todo = mongoose.model('Todo', TodoSchema);

// CRUD routes

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new todo
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        completed: req.body.completed || false,
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
// app.put('/todos/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, completed } = req.body;

//     try {
//       const updatedTodo = await Todo.findByIdAndUpdate(
//         id,
//         { title, completed },
//         { new: true, runValidators: true }  
//       );

//       if (!updatedTodo) {
//         return res.status(404).json({ message: 'Todo not found' });
//       }

//       res.json(updatedTodo);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });



//   updated task
app.put('/todos/:id', async function (req, res) {
    const { id } = req.params;
    const { title, completed } = req.body

    try {
        const todoUodated = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true, runValidators: true }
        )

        if (!todoUodated) {
            return res.status(404).json({ 'message': 'not found ' })
        }
        res.json(todoUodated)
    }
    catch (err) {
        res.status(400).json({ message: 'err.message' })
    }
})


// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    console.log(`Deleting Todo with ID: ${id}`);

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
