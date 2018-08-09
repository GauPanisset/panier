const express = require('express');
const serveStatic = require('serve-static');
const PORT = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.get('/home', function (req, res) {
    console.log(__dirname);
    res.sendFile('/dist/home.html')
});

app.listen(PORT);
console.log('server started '+ PORT);
