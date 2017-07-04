/**
 * Created by liliz on 2017/7/4.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var query=require("./mysql_pool");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/',function (req,res,next) {
    console.log(req.body)
});

module.exports = router;
