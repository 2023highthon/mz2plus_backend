const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '21771126!',
    database : 'highthon'
  });
connection.connect();

router.use(express.json());

router.post('/', (req, res) => {
    let {comment_id, content, date} = req.body;
    const user = atob(req.session.user).split("&")[0];
    connection.query(`insert into recomment (content, date, comment_id, user) values (?, ?, ?, ?)`, [content, date, comment_id, user], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '댓글이 작성되었습니다.'});
    });
});

router.get('/:comment_id', (req, res) => {
    const id = req.params.comment_id;
    connection.query(`select * from recomment where comment_id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

module.exports = router;