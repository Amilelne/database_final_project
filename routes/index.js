var express = require('express');
var util = require('util')
var router = express.Router();
const pg = require('pg')
const conString = 'postgres://db7:db007@140.114.77.23/db7' // make sure to match your own database's credentials
const perString = 'postgres://db8:db008@140.114.77.23/db8'
var actual_longitude
var actual_latitude

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
        })
    })
})
router.post('/show',function (req,res) {
    pg.connect(conString, function (err, client, done) {
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
        actual_longitude = req.body["sensor longtitude"]
        actual_latitude = req.body["sensor latitude"]
        var query_result
        var health_center

        client.query('INSERT INTO accident_event VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [accident_id,accident_status,item_no,road_id,road_type,road_section_name,road_direction,milage,actual_longitude,actual_latitude],function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            client.query('SELECT * FROM accident_event',function (err,result) {
                done();
                query_result = result.rows
                //res.send(result.rows);
            })

        })
    });
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT health_center_id FROM health_center WHERE ((latitude-$1)^2+(longitude-$2)^2) = (SELECT MIN((latitude-$1)^2+(longitude-$2)^2) FROM health_center)',[actual_latitude,actual_longitude],function (err,result) {
            done();
            if (err) {
                return console.error('error happened during query', err)
            }
            console.log("health_center:",result.rows[0]["health_center_id"])
            health_center = result.rows[0]["health_center_id"]
        })
        client.query('SELECT chinese_name FROM police_station WHERE (latitude-$1)^2+(longitude-$2)^2 = (SELECT MIN((latitude-$1)^2+(longitude-$2)^2) FROM police_station)',[actual_latitude,actual_longitude],function (err,result) {
            done();
            console.log("police_station:",result.rows[0]["chinese_name"])
            res.send(result.rows[0]["chinese_name"]);
        })
    })
})

router.get('/getres',function (err,res) {
    res.render('getres', {title: 'Add Response Unit'});
})

router.post('/response',function (err,res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        var response_id = req.body["response id"]
        var accident_id = req.body["accident id"]
        var item_no = req.body["item no"]
        var response_police_stations = req.body["response police station"]
        var response_health_center = req.body["response health center"]
        var road_id = req.body["road id"]
        var road_direction = req.body["road direction"]
        var milage = req.body["milage"]

        client.query('INSERT INTO response_unit VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [response_id,accident_id,item_no,response_police_stations,response_health_center,road_id,road_direction,milage],function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            client.query('SELECT * FROM response_unit',function (err,result) {
                done();
                query_result = result.rows
                //res.send(result.rows);
            })

        })
    });
})

router.get('/update',function (err,res) {
    res.render('update', {title: 'Update Accident Event'});
})

router.post('/update',function (req,res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        var accident_id = req.body["accident id"]
        var actual_latitude = req.body["actual latitude"]
        var actual_longitude = req.body["actual longitude"]
        client.query('UPDATE accident_event SET actual_latitude=$1,actual_longitude=$2,accident_status = \'clear\' where accident_id = $3',[actual_latitude,actual_longitude,accident_id], function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            client.query('SELECT * FROM accident_event WHERE accident_id=$1',[accident_id],function (err,result) {
                res.send(result.rows)
            })
        })
    })
})


module.exports = router;
