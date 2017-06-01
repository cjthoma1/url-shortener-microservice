var express = require("express"),
app = express(),
path = require('path'),
port = process.env.PORT || '8080',

validUrl = require("valid-url"),
paramUrl = '';

app.use(express.static(path.resolve(__dirname, 'client')));
app.use("/new/:url", (req, res) => {
    paramUrl = req.params.url +"/"+req.path
   if(validUrl.isUri(paramUrl)) {
     res.redirect(paramUrl);
   }
   else{
       res.send("Whoops")
   }
})

app.get("/:id", (req, res) => {
    if(parseInt(req.params.id)){
        res.send("ID for "+ paramUrl)
    }
})







app.listen(port, () => {
    console.log("Listening on port "+port);
})