require('dotenv').config;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')

const authRouter = require('./routes/auth.routes.js');
const homeRouter = require('./routes/home.routes.js');
const searchRouter = require('./routes/search.routes.js');
const userRouter = require('./routes/user.routes.js');
const { isUserAuthenticated } = require('./app/middlewares/permissions');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 // 1 day
  },
  store: MongoStore.create({
    mongoUrl: process.env.DEV_DB_URL,
    autoRemove: 'native'
  })
}

class App {
  constructor() {
    this.express = express();
    this.appSettings();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.static(path.join(__dirname, '..', 'public')));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(expressSession(sessionConfig))
  }

  routes() {
    this.express.get('/', isUserAuthenticated, (req, res, next) => {
      res.render('index');
    });
    this.express.use('/auth', authRouter);
    this.express.use('/search', searchRouter);
    this.express.use('/user', userRouter);
    this.express.use(homeRouter);
  }

  appSettings() {
    this.express.set('views', path.join(__dirname, '..', 'views'));
    this.express.set('env', process.env.NODE_ENV);
    this.express.set('view engine', 'ejs');
  }
}

// export {__dirname};
module.exports = new App().express;
