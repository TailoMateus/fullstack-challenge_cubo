import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import PessoaBox from './Pessoa';

class App extends Component {

  render() {
    return (
      <div className="App">

        <PessoaBox/>
      </div>
    );
  }
}

export default App;