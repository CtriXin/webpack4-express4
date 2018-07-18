/*
 * @Author: xin.song 
 * @Date: 2018-07-18 10:03:55 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-18 10:04:28
 */

const express = require('express');
const app = express();
const router = express.Router();
router.use(function (req, res, next) {
  res.locals.title ='Musicash'
  res.locals.metaimgurl ='musicash/img'
  res.locals.metaurl ='musicash'
  res.locals.metadescrip ='musicash'
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('用户语言：', req.language, req.acceptsLanguages());
  res.render('index', {
    // title: req.t('lang'),
    title: '首页',
    test: '/dist/images'
  });
});


module.exports = router;