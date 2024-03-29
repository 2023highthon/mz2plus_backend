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
    connection.query(`select * from qna`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

router.post('/', (req, res) => {
    const {content, upload_date, title, category} = req.body;
    if(req.session.user == null) res.status(400).send({message: '로그인이 필요합니다.'});
    const user = atob(req.session.user).split("&")[0];
    console.log(user)
    connection.query(`insert into qna (title, content, upload_date, user, category) valu  es (?, ?, ?, ?, ?)`, [title, content, upload_date, user, category], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '게시글이 작성되었습니다.'});
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`select * from qna where article_id=?`, [id], function (error, results, fields) {
        connection.query(`update qna set count = count+1 where article_id = ${id}`)
        if (error) throw error;
        res.send(results);
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`delete from qna where article_id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '게시글이 삭제되었습니다.'});
    });
});

router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    connection.query(`select * from qna where category=?`, [category], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

module.exports = router;