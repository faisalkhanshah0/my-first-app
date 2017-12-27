const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const api = require('./server/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', api); 

// app.get('*'), (req, res) => {

//     res.sendFile(path.join(__dirname, 'dist/index.html'));

// } 

var port = process.env.PORT || 3000;

// app.set('port', port);

var server = http.createServer(app);

server.listen(port, () =>{
    console.log('server started at port : '+port);
});