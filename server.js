const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'heyya',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'ohoh',
      entries: 0,
      joined: new Date()
    }
  ]
}

/**
 * Giving a idea....
 * 
 * 
 * CHECK TEST:
 *   --> res = GET req OK
 * 
 * SIGNIN: 
 *   --> POST = success OR fail
 * REGISTER:
 *    -->  POST = user object
 * /PROFILE/:userId
 *    --> GET = user
 * 
 * /IMAGE:
 *   --> PUT return user object
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
  if(req.body.email === database.users[0].email && 
     req.body.password === database.users[0].password) {
       res.json('This is a success !!!');
  }
  else {
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
  const { email , name , password } = req.body;

  database.users.push( {
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length-1]);
});













app.listen(3000, () => {
  console.log('app is running on port 3000');
} )