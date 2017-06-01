var express = require("express"),
app = express(),
path = require('path'),
port = process.env.PORT || '8080'

app.use(express.static(path.resolve(__dirname, 'client')));

app.listen(port, () => {
    console.log("Listening on port "+port);
})