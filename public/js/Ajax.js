class Ajax {
  constructor() {
    this.registerEndpoint = '/auth/register'
    this.loginEndpoint = '/auth/login'

    this.addMovieEndpoint = '/user/list/movies/add'
    this.updateMovieEndpoint = '/user/list/movies/update'

    this.addShowEndpoint = '/user/list/shows/add'
    this.updateShowEndpoint = '/user/list/shows/update'

    this.updateEmailEndpoint = '/user/settings/newEmail'
    this.updatePassword = '/user/settings/newPassword'
    this.updateUsername = '/user/settings/newUsername'
  }

    /**
   * Make a request to the specified endpoint.
   * @param {String} endpoint 
   * @param {Object} options {method, body, redirect}
   * @returns <Promise> 
   * 
   */

     async request(endpoint, options) {
      try {
        const response = await fetch(endpoint, options);
        if (response.status >= 400) {
          const jsonResponse = await response.json();
          if (jsonResponse.errors) {
            return {
              error: true,
              errors: jsonResponse.errors[0]
            }
          } else {
            return {
              error: true,
              errors: jsonResponse
            }
          }
        } else if (response.status >= 200 && response.status < 300) {
          const jsonResponse = await response.json();
          const redirectEndpoint = response.headers.get('location')
          return {
            error: false,
            data: jsonResponse,
            location: redirectEndpoint
          }
        }
      } catch(error) {
        return error
      }
    }

   async postAuth(form, errorSpan, successSpan) {
    const userData = new FormData(form);
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(userData),
      redirect: 'follow',
    };
  
    try {
      const response = await this.request(form.action, fetchOptions)
      if(!response.error) {
        const url = response.location
        window.location.href = url;
      } else {
        errorSpan.innerHTML = response.errors.msg
      }
    }catch(error) {
      throw error
    }
  
  }

  async postUpdateAndAdd(form, errorSpan, successSpan) {
    const userData = new FormData(form);
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(userData),
      redirect: 'follow',
    };
  
    try {
      const response = await this.request(form.action, fetchOptions)
      if(!response.error) {
        successSpan.innerHTML = response.data.msg
      } else {
        errorSpan.innerHTML = response.errors.msg
      }
    } catch (error) {
      
    }
  }
  
}