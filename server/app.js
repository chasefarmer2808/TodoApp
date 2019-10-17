const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname + '/../dist/todo-app')))

app.post('/todo', (req, res) => {
    console.log(req.body);
    addTodo(req.body['data'], (success) => {
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
        todos.push(todoObj);
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
            if (err) {
                callback(false);
            }
            callback(true);
        });
    });
}