import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import {Link} from 'react-router';

class App extends Component {

  render() {
    return (
      <div className="App">
      	{this.props.children}
      </div>
    );
  }
}

export default App;