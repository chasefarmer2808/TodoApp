const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', express.static(path.resolve(__dirname + '/../dist/todo-app')))

app.listen(port, () => console.log(`Listening on port ${port}`));