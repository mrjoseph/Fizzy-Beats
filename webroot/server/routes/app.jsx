import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../../client/views/home/home';
import About from '../../client/views/about/about';
const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </div>
);

export default App;