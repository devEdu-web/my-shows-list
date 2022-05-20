require('dotenv').config()

let db_url;

if(process.env.NODE_ENV == 'development') {
    db_url = process.env.DEV_DB_URL
} else if (process.env.NODE_ENV == 'production') {
    db_url = `mongodb+srv://${process.env.PROD_DB_USER}:${process.env.PROD_DB_PASSWORD}@cluster0.jbkhi.mongodb.net/?retryWrites=true&w=majority`
} else if (process.env.NODE_ENV == 'test') {
    db_url = process.env.TEST_DB_URL
} else {
    db_url = process.env.DEV_DB_URL
}

module.exports = db_url;