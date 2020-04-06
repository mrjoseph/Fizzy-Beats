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
  }

  removeToken() {
    if(this.isTokenExpired()){
      localStorage.removeItem(this.token);
    }
  }

  loggedIn() {
    const token = this.getToken();
    if (token) return true;
  }

  getToken = () => {
    return localStorage.getItem(this.token);
  }

  getProfile = () => {
    console.log('this.getToken()', this.getToken());
   if(this.getToken()) {
     console.log('in here');
      return  decode(this.getToken());
   }
  }

  setToken() {
    if(this.authToken !== null)
    localStorage.setItem(this.token, this.authToken);
  }

  isTokenExpired = () => {
    // if(!this.getToken()) return;
    const decoded = decode(this.getToken());
    console.log(decoded)
    // return (decoded.exp * 1000) < Date.now();
    return false;
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
