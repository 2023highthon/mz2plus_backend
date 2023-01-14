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
    let {content, date, article_id, board_id, user} = req.body;
    user = "asdf"//atob(req.session.user).split("&")[0];
    if(board_id == "board" || board_id == "qna") {
        connection.query(`insert into comment (content, date, article_id, board_id, user) values (?, ?, ?, ?, ?)`, [content, date, article_id, board_id, user], function (error, results, fields) {
            if (error) throw error;
            res.send({message: '댓글이 작성되었습니다.'});
        });
    }else{
        res.status(400).send({message: '잘못된 요청입니다.'});
    }
});

router.get('/board/:article_id', (req, res) => {
    const id = req.params.article_id;
    connection.query(`select * from comment where article_id=? and board_id='board'`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

router.get('/qna/:article_id', (req, res) => {
    const id = req.params.article_id;
    connection.query(`select * from comment where article_id=? and board_id='qna'`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

router.delete('/:comment_id', (req, res) => {
    const id = req.params.comment_id;
    connection.query(`delete from comment where comment_id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        res.send({message: '댓글이 삭제되었습니다.'});
    });
});


module.exports = router;