require('dotenv').config();
const axios = require('axios').default;

class GoogleOAuth {
  constructor() {
    this.rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    this.getTokensUrl = 'https://accounts.google.com/o/oauth2/token';
    this.callbackUrl = 'http://localhost:8080/auth/oauth/google/callback';
    (this.getUserUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'),
      (this.scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '));
  }

  getConsentScreenUrl() {
    const params = {
      redirect_uri: this.callbackUrl,
      access_type: 'offline',
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      prompt: 'consent',
      scope: this.scopes,
    };
    const query = new URLSearchParams(params);
    const url = `${this.rootUrl}?${query.toString()}`;
    return url;
  }

  async getTokens(code) {
    const params = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: this.callbackUrl,
      grant_type: 'authorization_code',
    };

    try {
      const query = new URLSearchParams(params);
      const response = await axios.post(this.getTokensUrl, query.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getUser(access_token, id_token) {
    try {
      const response = await axios.get(
        `${this.getUserUrl}?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new GoogleOAuth();
