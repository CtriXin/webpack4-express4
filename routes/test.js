const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('testing/index', {
    title: 'aaaaa'
  });
});

router.get('/im', function (req, res, next) {
  res.render('testing/im', {
    title: 'IM 测试'
  });
});


router.get('/chat', function (req, res, next) {
  res.render('testing/chat', {
    title: '测试socket.io'
  });
});
router.get('/room', function (req, res, next) {
  res.render('testing/chat_room', {
    title: '测试socket.io'
  });
});
router.get('/private/:from-:with', function (req, res, next) {
  let user1 = req.params.from
  let user2 = req.params.with
  console.log(user1, user2);
  res.render('testing/private', {
    title: '测试socket.io',
    user1: user1,
    user2: user2,
    roomid: user1 + '-' + user2

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