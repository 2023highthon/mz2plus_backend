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

router.get('/', (req, res) => {
    connection.query(`select * from board`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

router.post('/', (req, res) => {
    const {content, upload_date, title} = req.body;
    const user = "asdf"//atob(req.session.user).split("&")[0];
    console.log(user)
    connection.query(`insert into board (title, content, upload_date, user) values (?, ?, ?, ?)`, [title, content, upload_date, user], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '게시글이 작성되었습니다.'});
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`select * from board where article_id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`delete from board where article_id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '게시글이 삭제되었습니다.'});
    });
});

module.exports = router;