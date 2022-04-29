const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const path = require('path');

const authRouter = require('./routes/auth.routes.js')
const homeRouter = require('./routes/home.routes.js')
const searchRouter = require('./routes/search.routes.js')
const userRouter = require('./routes/user.routes.js')

// const __dirname = dirname(fileURLToPath(import.meta.url));

class App {
    constructor() {
        this.express = express()
        this.routes()
        this.middlewares()
        this.appSettings()
    }

    middlewares() {
        this.express.use(express.static(path.join(__dirname, '..', 'public')));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
    }

    routes() {
        this.express.get('/', (req, res, next) => {res.render('index');})
        this.express.use('/', authRouter)
        this.express.use('/search', searchRouter)
        this.express.use('/user', userRouter)
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