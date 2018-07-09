var express = require('express');
var app = express();
var router = express.Router();

var myLogger = function (req, res, next) {
  console.log('router - home - logger');
  next();
};

/* GET home page. */
router.get('/', myLogger, function (req, res, next) {
  console.log('用戶端語系：' + req.acceptsLanguages()[0], req.language);
  res.render('index', {
    // title: req.t('lang'),
    title: '首页',
    test: '/dist/images'
  });
});


module.exports = router;