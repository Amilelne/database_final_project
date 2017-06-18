var express = require('express');
var router = express.Router();
const pg = require('pg')
const conString = 'postgres://db7:db007@140.114.77.23/db7' // make sure to match your own database's credentials
const perString = 'postgres://db8:db008@140.114.77.23/db8'


/* GET home page. */
router.get('/', function(req, res, next) {
    pg.connect(perString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT * from accident_status_information', function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            res.send(result.rows,200)
            //process.exit(0)
        })
    })
  //res.render('index', { title: 'Express' });
});

router.get('/userlist', function (req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT * from accident_event', function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            res.send(result.rows,200)
        })
    });
});

/* GET New User page */
router.get('/newuser', function(req, res){
    res.render('newuser', {title: 'Add New User'});
});

router.post('/newuser',function (req,res) {
    pg.connect(perString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT * from accident_status_information', function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            res.send(result.rows[0],200)
            //process.exit(0)
        })
    })
})

router.post('/show',function (req,res) {
    pg.connect(perString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        var accident_id = req.body["accident id"]
        var accident_status = "not clear"
        var item_no = req.body["item no"]
        var road_id = req.body["road id"]
        var road_type = req.body["road type"]
        var road_section_name = req.body["road section name"]
        var road_direction = req.body["road direction"]
        var milage = req.body["milage"]
        var actual_longitude = req.body["sensor longtitude"]
        var actual_latitude = req.body["sensor latitude"]

        client.query('INSERT INTO accident_event VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[3,'not clear','H-1-S-252.2','國道1號',1,'國道1號(大林交流道到民雄交流道)',1,253.75,23.5974758138,120.434350914]);
        //res.send(req.body["accident id"])
        //client.query('INSERT INTO accident_event VALUES ($1,$1,$2,$3,$4,$5,$6,$7,$8,$10)',[accident_id,accident_status,item_no,road_id,road_type,road_section_name,road_direction,milage,actual_longitude,actual_latitude]);
        /*client.query('INSERT INTO accident_event VALUES ($0,$1,$2,$3,$4,$5,$6,$7,$8,$9)', [accident_id,accident_status,item_no,road_id,road_type,road_section_name,road_direction,milage,actual_longitude,actual_latitude],function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            client.query('SELECT * FROM accident_event',function (err,result) {
                done();
                res.send(result);
            })
        })*/
    });
})
module.exports = router;
