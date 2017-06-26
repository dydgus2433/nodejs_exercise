var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var port_number = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views','./views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){
  fs.readdir('data',  'utf8',function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('new',{topics:data});
    })

})
app.get(['/topic','/topic/:id'],function(req,res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id값이 있을 때
      fs.readFile('data/'+id,  'utf8',function(err, data){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          res.render('view',{topics:files, title:id, description: data});
        })
    }else{
      //id 값이 없을 때
        res.render('view',{topics:files, title:'Welcome', description: 'Hello, JavaScript for Server'});
    }

  })

});
/*
//중복이고 상관없이 짜고 자기가 작성한 코드를 보고 그때 그 중복을 제거(반복하다보면) 처음부터 코드중복을 제거하는 코드를 만들 수 있을거야
app.get('/topic/:id', function(req,res){

  fs.readdir('data',function(err, files){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }

  })
});
*/
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
        console.log(err); //해킹의 빌미가 될 수 있기에 보여주지 않음
        res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title); // callback 함수가 실행된 후에 리스폰스 할 수 있음
  })

});


app.listen(port_number, function (req, res){
  console.log('Connected, '+port_number+' port!');
})
