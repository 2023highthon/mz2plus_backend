const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const index = require('./routes/index');
app.use('/', index)

const users = require('./routes/users');
app.use('/users', users)

const board = require('./routes/board');
app.use('/board', board)

const boardQna = require('./routes/boardQna');
app.use('/board-qna', boardQna)

const comment = require('./routes/comment');
app.use('/comment', comment)

const recomment = require('./routes/recomment');
app.use('/recomment', recomment)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});