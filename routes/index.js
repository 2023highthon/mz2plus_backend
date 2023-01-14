const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '21771126!',
    database : 'highthon'
});
connection.connect();

router.use(express.json());

router.get('/search', (req, res) => {
    const search = req.query.search;
    const type = req.query.type;
    connection.query(`select * from ${type} where title like "%${search}%" or content like "%${search}%"`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

router.get('/popu', (req, res) => {
    connection.query(`select * from (SELECT * FROM highthon.qna union SELECT * FROM highthon.board) as temp order by count desc limit 10`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

module.exports = router;