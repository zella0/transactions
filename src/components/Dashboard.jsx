import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

const itemStyle = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


class Dashboard extends Component {
  state = {
    items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    page: 0
  }
  fetchMoreData = () => {
    axios.get(`http://localhost:8000/transactions?page=${this.state.page}`)
    .then((response)=>{
      console.log(this.state.items)
      // this.state.items.push(...response.data);

      // let  
      let result = this.state.items.push(...response.data);

      this.setState({
        page: this.state.page+1,
        items: [...this.state.items, ...response.data]
      });
    })
  };

  render() { 
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((item, index) => (
            <div style={itemStyle} key={index}>
              div - #{item.id}
              {/* {console.log(item)} */}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
 
export default Dashboard;