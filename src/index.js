import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PessoaBox from './Pessoa.js';
import Home from './Home';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="/pessoa" component={PessoaBox}/>
		</Route>
	</Router>), 
	document.getElementById('root')
);
registerServiceWorker();
