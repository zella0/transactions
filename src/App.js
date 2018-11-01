import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import EntryPortal from './components/EntryPortal';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
     <React.Fragment>
       <Switch>
         <Route exact path='/' component={EntryPortal} />
         <Route exact path='/dashboard' component={Dashboard} />
       </Switch>
     </React.Fragment>
    );
  }
}

export default App;
