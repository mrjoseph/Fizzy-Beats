/* global localStorage */
import decode from 'jwt-decode';
import { LOGIN_QUERY } from '../graphql/queries/queries';

export default class AuthService {
  constructor() {
    this.authToken = null;
    this.token = 'id_token';
  }

  logout() {
    localStorage.removeItem(this.token);
    localStorage.removeItem('apollo-cache-persist');
  }

  loggedIn() {
    const token = this.getToken();
    return (!!token && !this.isTokenExpired(token));
  }

  getToken = () => {
    return localStorage.getItem(this.token);
  }

  getProfile = () => {
   if(this.getToken()) {
      return  decode(this.getToken());
   }
  
  }

  setToken() {
    if(this.authToken !== null)
    localStorage.setItem(this.token, this.authToken);
  }

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token);     
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }
  login = async (client, { password, email }) => {
    const { data } = await client.query({
      query: LOGIN_QUERY,
      variables: { email, password },
    });
    if (data.loginUser.status === 'NO_USER_FOUND') {
      return data;
    }

    this.authToken = data.loginUser.auth;
    this.setToken();
    return data;
  };

  register = async (addUser, { username, password, email }) => {

    const { data } = await addUser({
      variables: { username, email, password },
    });
    
    if (data.addUser.status === 'USER_EXISTS') {
      return (data.addUser);
    }
    
    this.authToken = data.addUser.auth;
    this.setToken();
    return (data.addUser);
  }
}
