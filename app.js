var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer = require('multer');
var upload = multer({dest:'uploads/'});
var app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ayush10301",
  database: "cipher"
})
const util = require('util')

const conn = {
  query: (sql, args) => {
    return util.promisify(connection.query).call(connection, sql, args);
  },
  close: () =>{
    return util.promisify(connection.end).call(connection);
  }
};

connection.connect(function(err){
  if(!err) console.log("Connected to database")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/videoPost', upload.single('video'), async function(req, res){
  try{
    await conn.query(`INSERT INTO video (title, description, file_name, uploader) VALUES('${req.body.title}', '${req.body.description}', '${req.file.filename}', '${req.body.username}');`)
    res.status(200).send({message:"Video uploaded"});
  }catch(error){
    res.status(400).send({
      message:"Enocountered an error",
      error: error
    })
  }  
})

app.get('/getAllVideos', async function(req, res){
  try{
    var result = await conn.query(`SELECT * FROM video;`);
    res.status(200).send({
      message:"successful",
      data: result
    })
  }catch(error){
    res.status(400).send({
      message:"Encountered an error",
      error: error
    })
  }
});


app.get('/getVideo', async function(req, res){
  try{
    var que = req.query;
    var result = await conn.query(`SELECT * FROM video WHERE id=${que.id};`);
    res.status(200).send({
      message:"successful",
      data: result
    })
  }catch(error){
    res.status(400).send({
      message:"Encountered an error",
      error: error
    })
  }
});

app.get('/getLiked', async function(req, res){
  try{
    var que = req.query;
    var result = await conn.query(`select video.title as title, video.file_name as file_name, video.uploader as uploader, video.likes as likes, video.id as id from video inner join user_likes on video.id=user_likes.video_id where user_likes.username='${que.username}';`);
    res.status(200).send({
      message:"successful",
      data: result
    })
  }catch(error){
    res.status(400).send({
      message:"Encountered an error",
      error: error
    })
  }
});


app.post("/incrementLike", async function(req, res){
  try{

    console.log(body);
    body = typeof body === "string"?JSON.parse(body):body;
    console.log(body)

    await conn.query(`UPDATE video SET  likes=likes+1 WHERE id=${body.video_id};`);
    await conn.query(`INSERT INTO user_likes values('${body.username}', ${body.video_id});`)
    res.status(200).send({
      message:"done"
    })
  }catch(error){
    res.status(400).send({
      error:error
    })
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
