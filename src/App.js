import React, { Component } from 'react';
import './App.css';

import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$5n2.4ieWS6SoYB6ebY4ri.8AK4kgWrXLcSgEXC65.U3yZaMme7Iz2",
        "Content-Type": "application/json"
      }
    };
  
    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  render() {
    const page = this.state.showAddForm
      ? <AddBookmark 
        showForm={show => this.setShowAddForm(show)}/>
      : <BookmarkApp 
        bookmarks={this.state.bookmarks}
        showForm={show => this.setShowAddForm(show)}/>;

    return (
      <div className="App">
        { page }
      </div>
    );
  }
}

export default App;