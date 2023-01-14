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
    const {id, password, name, date, profile_img} = req.body;
    connection.query(`select * from users where id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        if(results.length === 0){
            connection.query(`insert into users (id, password, name, date, profile_img) values (?, ?, ?, ?, ?)`, [id, password, name, date, profile_img], function (error, results, fields) {
                if (error) throw error;
                res.send({message: '회원가입이 완료되었습니다'});
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
            res.status(401).send({message: '아이디 또는 비밀번호가 일치하지 않습니다.'});
        }else{
            req.session.user = btoa(results[0].id + "&" +  results[0].password)
            res.send(req.session);
        }
    });
});

router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send({message: '로그아웃 되었습니다.'});
});

router.get('/info', (req, res) => {
    if(req.session.user){
        const [id, password] = atob(req.session.user).split("&");
        connection.query(`select * from users where id=? and password=?`, [id, password], function (error, results, fields) {
            if (error) throw error;
            res.send({
                "user_pk": results[0].user_pk,
                "name": results[0].name,
                "id": results[0].id,
                "password": results[0].password,
                "age": results[0].age,
                "profile_Img": results[0].profile_Img
            });
        });
    }else{
        res.send({message: '로그인이 필요합니다.'});
    }
});

router.get('/overlap', (req, res) => {
    const {id} = req.body;
    connection.query(`select * from users where id=?`, [id], function (error, results, fields) {
        if (error) throw error;
        if(results.length === 0){
            res.send({message: '사용 가능한 아이디입니다.'});
        }else{
            res.send({message: '이미 존재하는 아이디입니다.'});
        }
    });
})

module.exports = router;