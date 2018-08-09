const express = require('express');
const serveStatic = require('serve-static');
const FS = require('fs');
const PORT = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname + "/dist"));

console
console.log(FS.existsSync(__dirname + "/dist"));

app.listen(PORT);
console.log('server started '+ PORT);
