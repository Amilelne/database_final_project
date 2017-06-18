const pg = require('pg')
const conString = 'postgres://db7:db007@140.114.77.23/db7' // make sure to match your own database's credentials
const perString = 'postgres://db8:db008@140.114.77.23/db8'
var express = require('express')
var app = express()

app.get('/',function (req,res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('SELECT * from response_unit', function (err, result) {
            done()

            if (err) {
                return console.error('error happened during query', err)
            }
            res.send(result.rows[0],200)
            //process.exit(0)
        })
    })
})

app.get('/info',function (req,res) {
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

app.listen(3000)
console.log("Express server start")