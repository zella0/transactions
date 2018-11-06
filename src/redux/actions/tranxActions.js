import {
FETCH_TRANSACTIONS,
ADD_TRANSACTION,
DELETE_TRANSACTION,
UPDATE_TRANSACTION,
} from './types';

import axios from 'axios';

export const fetchTransactions = () => dispatch => {
  axios.get('http://localhost:8000/transactions?page=0', {
    headers: {
      token: localStorage.getItem('token')
    }
  }).then((response) => {
      dispatch({
        type: FETCH_TRANSACTIONS,
        payload: response.data
      })
    })
}

export const addTransaction = (postBody) => dispatch => {
  axios.post("http://localhost:8000/transactions/create", postBody, {
    headers: {
      token: localStorage.getItem('token')
    }
  }).then(response => {
      dispatch({
        type: ADD_TRANSACTION,
        payload: response.data
      });
    })
};

export const deleteTransaction = id => dispatch => {
  axios.delete(`http://localhost:8000/transactions/remove/${id}`, {
    headers: {
      token: localStorage.getItem('token')
    }
  }).then(() => dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    }))
};

export const updateTransaction = (postBody) => dispatch => {
  axios.patch(`http://localhost:8000/transactions/update/${postBody.id}`, postBody, {
    headers: {
      token: localStorage.getItem('token')
    }
  }).then(() => {
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: postBody
      });
    })
};

// <InfiniteScroll
//   dataLength={this.state.items.length}
//   next={this.fetchMoreData}
//   hasMore={true}
//   loader={<h4>Loading...</h4>}
// >
//   {this.state.items.map((item, index) => (
//     <div style={itemStyle} key={index}>
//       div - #{item.id}
//       {/* {console.log(item)} */}
//     </div>
//   ))}
// </InfiniteScroll>