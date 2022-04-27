import dotenv from 'dotenv'
dotenv.config()

let db_url;

if(process.env.NODE_ENV == 'development') {
    db_url = process.env.DEV_DB_URL
} else if (process.env.NODE_ENV == 'production') {
    db_url = process.env.PROD_DB_URL
} else if (process.env.NODE_ENV == 'test') {
    db_url = process.env.TEST_DB_URL
} else {
    db_url = process.env.DEV_DB_URL
}

export default db_url;