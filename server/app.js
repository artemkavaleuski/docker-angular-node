require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');;
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const whitelist = ['http://localhost:8888']

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

app.use('/', indexRouter);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
).then(() => {
  app.listen(process.env.PORT,process.env.HOST,() => {
    console.log(`Server running on port ${process.env.PORT}`)
  });  
}).catch((error) => {
  console.log(`MondoDB Error: ${error}`)
})

