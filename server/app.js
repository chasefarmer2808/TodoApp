const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname + '/../dist/todo-app')))

app.post('/todo', (req, res) => {
    addTodo(req.body['data'], (success) => {
        if (success) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    })
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
    fs.readFile('todos.json', (err, json) => {
        var todos = JSON.parse(json);
        todoObj['id'] = uniqid();
        todos.push(todoObj);
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
            if (err) {
                callback(false);
            }
            callback(true);
        });
    });
}

function deleteTodo(todoId, callback) {
    fs.readFile('todos.json', (err, json) => {
        var todos = JSON.parse(json);

        for (var i = 0; i < todos.length; i++) {
            if (todos[i]['id'] == todoId) {
                todos.splice(i, 1);
            }
        }
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
            if (err) {
                callback(false);
            }
            callback(true);
        });
    })
}