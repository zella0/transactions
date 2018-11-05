import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { connect } from 'react-redux';

import EntryPortal from './components/EntryPortal';
import Dashboard from './components/Dashboard';

import { fetchTransactions } from './redux/actions/tranxActions';


class App extends Component {
  componentDidMount(){
    this.props.fetchTransactions();
  }

  render() {
    let isLoggedIn = null;
    if(this.props.transactions){
      isLoggedIn = this.props.transactions.message ? false : true;
      return (
      <React.Fragment>
        <Switch>
          <Route path="/" render={() => (
              isLoggedIn ? (
                <Dashboard/>
              ) : (
                <EntryPortal />
              )
            )}/>
        </Switch>
      </React.Fragment>
      );
    }else{
      return <div>Loading..</div>
    }
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions[0],
})

const mapDispatchtoProps = {
  fetchTransactions
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
