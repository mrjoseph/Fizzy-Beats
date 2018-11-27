import decode from 'jwt-decode';

export default class AuthService {
  constructor() {
    this.authToken = null;
    this.token = 'id_token';
  }

  logout() {
    localStorage.removeItem(this.token);
  }

  loggedIn() {
    const token = this.getToken();
    return (!!token && !this.isTokenExpired(token));
  }

  getToken() {
    return localStorage.getItem(this.token);
  }

  getProfile() {
    return this.getToken() && decode(this.getToken());
  }

  setToken() {
    localStorage.setItem(this.token, this.authToken);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  register(addUser, { username, password, email }) {
    return new Promise((resolve) => {
      addUser(
        {
          variables:
                {
                  username,
                  email,
                  password,
                },
          update: (cache, { data }) => {
            if (data.addUser.status === 'SUCCESS') {
              this.authToken = data.addUser.auth;
              this.setToken();
            }
            resolve(data);
          },
        },
      );
    });
  }
}
