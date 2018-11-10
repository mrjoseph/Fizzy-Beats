import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/home/home';
import User from './views/user/user';
import About from './views/about/about';
import NotFound from './views/not-found/not-found';
import './main.css';
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/user" component={User} />
    <Route component={NotFound} />
  </Switch>
);
export default App;
