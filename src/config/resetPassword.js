const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env'),
});

let url;

if (process.env.NODE_ENV == 'development') {
  url = process.env.RESET_DEV_URL;
} else {
  url = process.env.RESET_PROD_URL;
}

module.exports = {
  resetCallbackUrl: url,
};
