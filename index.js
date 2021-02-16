const express = require('express')
const app = express()
const port = 3000
const {v4 : uuidv4} = require('uuid')
const init_uuid = uuidv4()
const path = require('path');
//mqtt config
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

// Set directory to contain the templates ('views')
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

app.get("/", (req, res) => {
  res.render("index", { title: "Collab-Edit" , uuid: init_uuid});   
});

app.get("/:id", (req, res) => {
  res.render("index", { title: "Collab-Edit" , uuid: req.params.id});   
});
 
client.on('connect', function () {
  console.log('Connected to MQTT!');
});