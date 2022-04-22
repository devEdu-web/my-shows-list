import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js'
// import moviesRouter from './routes/movies.routes.js';
import homeRouter from './routes/home.routes.js';
import searchRouter from './routes/search.routes.js'
import userRouter from './routes/user.routes.js'
// import showsRouter from './routes/shows.routes.js'

dotenv.config()

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.set('views', path.join(__dirname, 'views'));
app.set('env', process.env.NODE_ENV);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {res.render('index');})
app.use('/', authRouter)
app.use('/search', searchRouter)
app.use('/user', userRouter)
// app.use('/movies', moviesRouter)
// app.use('/shows', showsRouter)
app.use(homeRouter)

export {__dirname};
export default app;