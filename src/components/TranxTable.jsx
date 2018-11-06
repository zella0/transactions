import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Container } from 'reactstrap';

import { connect } from 'react-redux';
import { fetchTransactions, addTransaction, deleteTransaction, updateTransaction } from '../redux/actions/tranxActions';


class TranxTable extends Component {
  state = {
    current_max_page: 0,
    tranX_selections: {}
  }
  componentDidMount() {
    this.props.fetchTransactions(1);

  }

  render() {
    const columns = [{
      dataField: 'business_name',
      text: 'Business Name',
      test: (()=> <div> asdf </div>)
    }, {
      dataField: 'type',
        text: 'Transaction Type'
    }, {
      dataField: 'amount',
      text: 'Transaction Cost'
    }];


    const options = {
      exportCSVText: 'my_export',
      insertText: 'my_insert',
      deleteText: 'my_delete',
      saveText: 'my_save',
      closeText: 'my_close'
    };

    return (
      <Container style={{ color: "white", backgroundColor: "grey", padding: 0, margin: "100px auto" }}>
        <BootstrapTable data={this.props.transactions} options={options}
          insertRow
          deleteRow
          exportCSV>
          <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
})

const mapDispatchtoProps = {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction
}

export default connect(mapStateToProps, mapDispatchtoProps)(TranxTable);

