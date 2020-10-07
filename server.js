const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date(),
    },
  ],
  /*,
  login: [
    {
      id: '',
      hash: '',
      email: 'john@gmail.com'
    }
  ]*/
};

/**
 * Giving a idea....
 *
 *
 * CHECK TEST:
 *   --> res = GET req OK
 *
 * SIGNIN:
 *    --> POST = success OR fail
 * REGISTER:
 *    -->  POST = user object
 * /PROFILE/:userId
 *    --> GET = user
 *
 * /IMAGE:
 *    --> PUT return user object
 */

app.get('/', (req, res) => {
  res.send(database.users);
});

/**
 * On our case,
 *  we focus on the Body
 *  then select the raw & JSON on  postman
 */
app.post('/signin', (req, res) => {
  bcrypt.compare('annanas', '$2a$10$4qFPQyxl74THxsCDw9WeAeT1mI4Z7ECBrmTEgdIqGccS.npKIHznW', function (err, res) {
    console.log('first guess', res);
  });
  bcrypt.compare('veggies', '$2a$10$4qFPQyxl74THxsCDw9WeAeT1mI4Z7ECBrmTEgdIqGccS.npKIHznW', function (err, res) {
    console.log('scd guess', res);
  });

  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('This is a success !!!');
  } else {
    res.status(400).json('We ve got an erro, pass do not match!???');
  }
});

/**
 * Starting with
 *  the new user inputs (name, email, pass)
 *  we want to  push another one
 *  new user in the database variable (object)
 *
 *  start first the "static" way to do
 */
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json('There are no such user with that name. Sorry.');
  }
});

/**
 *
 * In that case,
 *  we update from the image section url
 *  cos' we want to increment entries
 *  to have a "Rank number" to display
 *
 * Notice, here we want
 *  to check on the body of the req
 *
 */
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json('There are no such user with that name. Impossible to count.');
  }
});

/**
 *  bcrypt-nodejs package
 *
 */
// Load hash from your password DB.

//bcrypt.hash(password, null, null, function(err, hash) {
// console.log(hash);
//});
//bcrypt.compare("bacon", hash, function(err, res) {
// res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
// res = false
//});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
