import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js'
dotenv.config()

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.set('views', path.join(__dirname, 'views'));
app.set('env', process.env.NODE_ENV);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', authRouter)

app.get('/', (req, res, next) => {
    res.render('index');
})

app.get('/home', (req, res, next) => {
    res.render('home')
})

export {__dirname};
export default app;