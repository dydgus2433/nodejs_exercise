var express = require('express'); //
var bodyParser = require('body-parser'); //미들웨어(포스트 body쓰게해줌)
// supervisor : watch기법 수정하면 자동 재실행
var app = express();
app.locals.pretty = true;
app.set('views', './views'); //폴더명  : views

app.set('view engine', 'jade'); // view template : Jade

app.use(express.static('public')); //정적 파일 사용하기 위함
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/form', function (req, res){
  res.render('form'); //view template 폴더(views) 안의 form.jade연결
})

app.get('/form_receiver', function(req, res){
  var title  = req.query.title; //get일 경우 query로 가져옴
  var description = req.query.description;
  res.send(title+','+ description);
})

app.post('/form_receiver' , function(req, res){
  var title = req.body.title; //post일 경우 body로 가져옴( body parser,)
  var description = req.body.description;
  res.send(title+','+ description);

})


app.get('/topic/:id', function(req, res){ //topic/0 이런식으로  get방식 호출
  var topics = [
    'Javascipt is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
  <a href = '/topic/0'>JavaScript </a><br>
  <a href = '/topic/1'>NodeJS</a><br>
  <a href = '/topic/2'>Express</a><br><br>
    ${topics[req.param.id]}
  `;

  res.send(output);
});

app.get('/param/:module_id/:topic_id',function(req, res){
  res.json(req.params);

});


app.get('/template', function(req, res){
  res.render('temp', {time:Date(), _title : 'Jade'}); //temp라는 템플릿 파일을 웹페이지로 전송한다.
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
