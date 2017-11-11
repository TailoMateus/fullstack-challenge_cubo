import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PessoaBox from './Pessoa.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <PessoaBox/>,
  document.getElementById('root')
);

registerServiceWorker();
