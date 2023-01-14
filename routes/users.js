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
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


router.post('/register', (req, res) => {
    const {id, password, name, age, profile_img} = req.body;
    connection.query(`select * from users where id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        if(results.length === 0){
            connection.query(`insert into users (id, password, name, age, profile_img) values (?, ?, ?, ?, ?)`, [id, password, name, age, profile_img], function (error, results, fields) {
                if (error) throw error;
                res.send(results);
            });
        }else{
            res.send({message: '이미 존재하는 아이디입니다.'});
        }
    });
});

router.post('/login', (req, res) => {
    const {id, password} = req.body;
    connection.query(`select * from users where id=? and password=?`, [id, password], function (error, results, fields) {
        if (error) throw error;
        if(results.length === 0){
            res.send({message: '아이디 또는 비밀번호가 잘못되었습니다.'});
        }else{
            req.session.user = results[0];
            res.send(req.session.user);
        }
    });
});

module.exports = router;