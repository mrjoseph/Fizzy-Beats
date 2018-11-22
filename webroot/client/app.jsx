import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/home/home';
import User from './views/user/user';
import About from './views/about/about';
import Register from './views/register/Register';
import NotFound from './views/not-found/not-found';
import Header from './components/header/Header';
import './main.css';


const App = () => (
<div>
  <Header />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/user" component={User} />
    <Route exact path="/register" component={Register} />
    <Route component={NotFound} />
  </Switch>
  <footer>
    footer
  </footer>
</div>
);
export default App;
