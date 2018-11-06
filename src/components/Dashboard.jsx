import React, { Component } from 'react';

import TranxTable from './TranxTable';

import { connect } from 'react-redux';

class Dashboard extends Component {

  render() { 
    return (
      <div>
        <TranxTable />
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  // transactions: state.transactions,
})

const mapDispatchtoProps = {

}

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);

