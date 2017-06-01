var express = require("express"),
app = express(),
path = require('path'),
port = process.env.PORT || '8080',

mongo = require('mongodb'),
monk = require('monk'),
db = monk('localhost:27017/url'),

validUrl = require("valid-url"),
paramUrl = '';

app.use(express.static(path.resolve(__dirname, 'client')));
// app.use((req,res) => {
//     req.db = db;
    
// });

app.use("/new/:url", (req, res) => {
    paramUrl = `${req.params.url}/${req.path}`
   if(validUrl.isUri(paramUrl)) {
     res.redirect(paramUrl);
   }
   else{
       res.json({"error":"Wrong url format, make sure you have a valid protocol and real site."})
   }
})

app.get("/:id", (req, res) => {
    var id = req.params.id.toString(),
    dbUrl;
    
    if(parseInt(id)){
        var urlCollection = db.get("paramurl");
        urlCollection.find({}, (err, docs) => {
            if(err) throw(err)
            dbUrl = docs[0].url;
            res.json(dbUrl);
            // res.redirect(dbUrl);
            db.close()
        })
    }
   
        else{
            res.json({"error": "This url is not on the database."})
        }
   
})







app.listen(port, () => {
    console.log("Listening on port "+ port);
})