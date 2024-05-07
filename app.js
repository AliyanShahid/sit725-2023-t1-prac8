const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const contactUsController = require('./controllers/contactUsController');

const app = express();
const http=require('http').Server(app)

let io = require('socket.io')(http);
io.on('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect', () => {
console.log('user disconnected');
});
setInterval(()=>{
socket.emit('number', parseInt(Math.random()*10));
}, 1000);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost:27017/EvCharging', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/contact_us', contactUsController);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

http.listen(3000, () => {
    console.log("Server Started on port 3000");
});