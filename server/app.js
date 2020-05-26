require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');;
const mongoose = require('mongoose');
const passport = require('passport');
const dummyRouter = require('./routes/dummy');
const userRouter = require('./routes/user');
const jwtStrategy = require('./helpers/jwtStrategy');
const localStrategy = require('./helpers/localStrategy');
const Dummies = require('./models/Dummy');

const app = express();

passport.use(jwtStrategy);
passport.use(localStrategy);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const whitelist = ['http://localhost:8888','http://localhost:4200']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use('/dummy', dummyRouter);
app.use('/users', userRouter);

mongoose.connect(
  `mongodb://${process.env.DB_HOST}`,
  { useNewUrlParser: true }
).then(() => {
  const autoDummy = new Dummies();
  autoDummy.text = 'Dummy Text'
  autoDummy.save()
  app.listen(process.env.PORT,process.env.HOST,() => {
    console.log(`Server running on port ${process.env.PORT}`)
  });  
}).catch((error) => {
  console.log(`MondoDB Error: ${error}`)
})

