var express = require('express');
var app = express();
var port_number = 3000;
app.locals.pretty = true;
app.set('views','./views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){
  res.render('new');
})

app.post('/topic', function(req, res){
  res.send('Hi , post');
})


app.listen(port_number, function (req, res){
  console.log('Connected, '+port_number+' port!');
})
