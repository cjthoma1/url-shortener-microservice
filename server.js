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
       var accessNumber = Math.floor(Math.random() * (9000 - 1) + 1),
       docs = {"accessNumber": accessNumber, "url": paramUrl};
       
       db.get("paramurl").insert(docs)
       
      
       res.json({"original_url": paramUrl, "short_url": `https://${req.hostname}/${accessNumber}`})
   }
   else{
       res.json({"error":"Wrong url format, make sure you have a valid protocol and real site."})
   }
})

app.get("/:id", (req, res) => {
    var id = req.params.id.toString(),
    dbUrl;
    
        db.get("paramurl").find({accessNumber: id}, (err, docs) => {
            if(err) throw(err)
            if(docs.length > 0){
             res.redirect(docs[0].url);
            }
            else{
                 res.json({"error": "This url is not on the database."})
            }
            db.close()
        })
   
   
        
           
       
   
})







app.listen(port, () => {
    console.log("Listening on port "+ port);
})