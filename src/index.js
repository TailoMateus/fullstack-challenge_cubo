import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PessoaBox from './Pessoa.js';
import Home from './Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	(
	<BrowserRouter>
      <Switch>
      	<Route path="/" component={App}>
			<Route path="/" component={Home}/>
			<Route path="/pessoa" component={PessoaBox}/>
		</Route>
      </Switch>
    </BrowserRouter>), 
	document.getElementById('root')
);

registerServiceWorker();