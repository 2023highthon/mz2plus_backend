const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const index = require('./routes/index');
app.use('/', index)

const users = require('./routes/users');
app.use('/users', users)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});