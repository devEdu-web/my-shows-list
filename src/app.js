const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth.routes.js')
const homeRouter = require('./routes/home.routes.js')
const searchRouter = require('./routes/search.routes.js')
const userRouter = require('./routes/user.routes.js')
const moviesRouter = require('./routes/movies.routes')
const { isUserAuthenticated } = require('./app/middlewares/permissions')

// const __dirname = dirname(fileURLToPath(import.meta.url));

class App {
    constructor() {
        this.express = express()
        this.appSettings()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.static(path.join(__dirname, '..', 'public')));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(cookieParser())
    }

    routes() {
        this.express.get('/', isUserAuthenticated, (req, res, next) => {res.render('index');})
        this.express.use('/auth', authRouter)
        this.express.use('/search', searchRouter)
        this.express.use('/user', userRouter)
        this.express.use('/movies', moviesRouter)
        this.express.use(homeRouter)
    }

    appSettings() {
        this.express.set('views', path.join(__dirname, '..', 'views'));
        this.express.set('env', process.env.NODE_ENV);
        this.express.set('view engine', 'ejs');
    }
}

// export {__dirname};
module.exports = new App().express;