const express = require('express');
const serveStatic = require('serve-static');
const PORT = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/home.html')
});

app.listen(PORT);
console.log('server started '+ PORT);
