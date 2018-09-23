import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../client/views/home/home';
import About from '../../client/views/about/about';
import NotFound from '../../client/views/not-found/not-found';


const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
