import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProviderTasks from './context/ProviderTasks';
import SignUp from './screens/SingUp';
import Login from './screens/Login';
import ToDo from './screens/ToDo';
import NotFound from './screens/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ProviderTasks>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/register" component={ SignUp } />
          <Route path="/todo" component={ ToDo } />
          <Route component={ NotFound } />
        </Switch>
      </ProviderTasks>
    </BrowserRouter>
  );
}

export default App;