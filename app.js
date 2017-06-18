var express = require('express');
var app = express();
app.set('views', './views'); //폴더명  : views

app.set('view engine', 'jade');

app.use(express.static('public'));
app.get('/template', function(req, res){
  res.render('temp'); //temp라는 템플릿 파일을 웹페이지로 전송한다.
})
app.get('/', function (req, res){
  res.send('Hello home page');
});
app.get('/dynamic',function(req,res){
  var lis = '';
  for(var i=0; i< 5; i++){
    lis = lis+'<li>coding</li>';
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html>
    <head>

      <meta charset="utf-8">
      <title>Dynamic Duo</title>
  </head>

    <body>
        <h1>Hello , Dyanmic</h1>
        <ul>
        ${lis}
        </ul>
        ${time}
    </body>
  </html>`
  res.send(output);
})
app.get('/login', function(req,res){
  res.send('Login please');
})

app.get('/route', function(req,res){
   res.send('Hello Router, <img src="/route.jpg">')
})


app.listen(3000,function(){
  console.log('Connected 3000 port!');
})
