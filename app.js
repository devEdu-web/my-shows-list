import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js'
dotenv.config()

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine('handlebars', engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: '/views/layout'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('env', process.env.NODE_ENV);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', authRouter)

app.use('/', (req, res, next) => {
    res.render('index');
})

export {__dirname};
export default app;