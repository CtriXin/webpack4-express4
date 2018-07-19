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


module.exports = router;