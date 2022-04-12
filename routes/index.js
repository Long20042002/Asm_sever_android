var express = require('express');
var router = express.Router();

//kết nối mongoDB

var db = 'mongodb+srv://mySQL:65pu3SMMAPmbtV4b@cluster0.nzvfu.mongodb.net/hinhanh?retryWrites=true&w=majority'

const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("Có lỗi xảy ra")
});

var hinhAnhSch = new mongoose.Schema({
  namePhoto : 'String',
  textPhoto : 'String',
  datePhoto : 'String',
  linkPhoto : 'String'
});

var HinhAnh = mongoose.model('hinhanh', hinhAnhSch);

//================

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newPhoto', function(req, res, next) {
  HinhAnh.find({}, function (err, data){
    res.render('newPhoto', { data: data });
  })
});

router.get('/addPhoto', function(req, res, next) {
  res.render('addPhoto', { title: 'addPhoto' });
});

router.get('/updatePhoto', function(req, res, next) {
  res.render('updatePhoto' );
});

//Add photo

router.post('/themHA', function (request, response){
  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var datePhoto = request.body.datePhoto;
  var linkHA = request.body.linkHA;

  console.log(tenHA + noiDungHA + linkHA);

  const data = new HinhAnh({
    namePhoto : tenHA,
    textPhoto : noiDungHA,
    datePhoto : datePhoto,
    linkPhoto : linkHA
  });

  data.save(function (error){
    var mes;
    if (error == null){
      mes = 'them thanh cong'
      console.log('them thanh cong')
    }else mes = error
    response.render('addPhoto', {message: mes});
  })
});

//================

//Update photo
router.post('/suaHA', function (request, response){
  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var datePhoto = request.body.datePhoto;
  var linkHA = request.body.linkHA;

  console.log(tenHA + noiDungHA + linkHA + datePhoto);

  HinhAnh.updateOne({namePhoto : tenHA}, {namePhoto: tenHA, textPhoto : noiDungHA, datePhoto: datePhoto, linkPhoto: linkHA}, function (err){
    if(err) throw err;
    console.log('Sua thanh cong');
  });
});

router.post('/dataUpdate', function (request, response){
  var idPhotoUpdate = request.body.idPhotoUpdate;

  console.log(idPhotoUpdate);
  HinhAnh.find({_id : idPhotoUpdate}, function (err, data){
    response.render('updatePhoto', { data: data });
  })
});
//================

//Delete photo
router.post('/xoaHA', function (request, response){
  var idPhoto = request.body.idPhoto;

  console.log(idPhoto);

  HinhAnh.deleteOne({_id : idPhoto},  function (err){
    if(err) throw err;
    console.log('Xoa thanh cong');
  });
});
//================

router.get('/newReact', function(req, res) {
  HinhAnh.find({}, function (err, data){
    res.send( data );
  })
});

module.exports = router;
