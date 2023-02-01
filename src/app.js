const express = require('express');

// ...

const app = express();

app.use(express.json());

// ...

// É importante exportar a constcante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
