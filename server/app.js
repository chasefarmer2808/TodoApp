const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const uniqid = require('uniqid');
const cors = require('cors');
const app = express();
const port = 3000;
const file = 'todos.json';

if (!fs.existsSync(file)) {
    fs.writeFile(file, '[]', err => {
        if (err) throw err;
    });
}

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.resolve(__dirname + '/../dist/todo-app')))

app.get('/todo', (req, res) => {
    fs.readFile(file, (err, json) => {
        res.send(json);
    });
});

app.post('/todo', (req, res) => {
    addTodo(req.body, (err, newTodo) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.send(newTodo);
        }
    })
});

app.put('/todo', (req, res) => {
    updateTodo(req.body, (err, updatedTodo) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.send(updatedTodo);
        }
    });
});

app.delete('/todo/:id', (req, res) => {
    deleteTodo(req.params['id'], (success) => {
        if (success) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function addTodo(todoObj, callback) {
    fs.readFile(file, (err, json) => {
        var todos = JSON.parse(json);
        todoObj['id'] = uniqid();
        todoObj['isDone'] = false;
        todos.push(todoObj);
        commitTodos(todos, (success) => {
            if (success) {
                callback(null, todoObj);
            }
            else {
                callback('Error adding todo.');
            }
        });
    });
}

function updateTodo(todoObj, callback) {
    fs.readFile(file, (err, json) => {
        var todos = JSON.parse(json);

        for (var i = 0; i < todos.length; i++) {
            if (todos[i]['id'] == todoObj['id']) {
                todos[i] = todoObj;
            }
        }

        commitTodos(todos, (success) => {
            if (success) {
                callback(null, todoObj);
            }
            else {
                callback('Error updating todo.');
            }
        });
    })
}

function deleteTodo(todoId, callback) {
    fs.readFile(file, (err, json) => {
        var todos = JSON.parse(json);

        for (var i = 0; i < todos.length; i++) {
            if (todos[i]['id'] == todoId) {
                todos.splice(i, 1);
            }
        }
        commitTodos(todos, callback);
    })
}

function commitTodos(todoJson, callback) {
    fs.writeFile(file, JSON.stringify(todoJson), err => {
        if (err) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
}