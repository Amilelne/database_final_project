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
    var email = req.body['email']
    var name = req.body['name']
    var password = req.body['password']
    query("insert into users(email,name,password) values(?,?,?)",[email.toString(),name.toString(),password.toString()],function (err,results,fields) {
        if(err)
            console.log(err)
        else
        {
            query("select * from users ",function (err,results,fields) {
                console.log(results)
            })
            var response = {}
            response['error'] = FALSE
            console.log(req.body)
        }
    })
});

module.exports = router;