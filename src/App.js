import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import {FormularioPessoa, TabelaPessoas} from './Pessoa';

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <FormularioPessoa/>

        <TabelaPessoas/>
      </div>
    );
  }
}

export default App;