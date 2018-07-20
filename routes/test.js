const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('testing/index', {
    title: 'aaaaa'
  });
});


router.get('/chat', function (req, res, next) {
  res.render('testing/chat', {
    title: '测试socket.io'
  });
});
router.get('/chat/:roomID', function (req, res, next) {
  var roomID = req.params.roomID;
  res.render('testing/room', {
    title: '测试socket.io',
    roomid: roomID
  });
});




module.exports = router;