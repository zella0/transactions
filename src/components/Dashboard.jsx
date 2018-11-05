import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import axios from 'axios';
import { connect } from 'react-redux';
import { fetchTransactions, addTransaction } from '../redux/actions/tranxActions';


const itemStyle = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


class Dashboard extends Component {
  componentDidMount(){
    // this.props.fetchTransactions();
    let postBody = {
      user_id: 1,
      type: "",
      business_name: "",
      amount: 0
    }
    this.props.addTransaction(postBody);
    console.log(this.props.transactions);
  }

  state = {
    items: [],
    page: 0
  }
  // fetchMoreData = () => {
  //   axios.get(`http://localhost:8000/transactions?page=${this.state.page}`)
  //   .then((response)=>{
  //     let result = this.state.items.push(...response.data);
  //     console.log(response)
  //     this.setState({
  //       page: this.state.page+1,
  //       items: [...this.state.items, ...response.data]
  //     });
  //   })
  // };

  render() { 
    return (
      <div>
        
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  transactions: state.transactions,
})

const mapDispatchtoProps = {
  fetchTransactions,
  addTransaction
}

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);

