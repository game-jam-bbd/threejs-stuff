
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

// endpoint to render the landing page
app.get('/', (req, res) => {
  res.sendFile(__dirname +  '/public/index.html');
});

const server = app.listen(5000);
console.log('App now running on url http://localhost:5000');
