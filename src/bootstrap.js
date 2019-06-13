import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';
import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware()(compose((window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)));

// import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';

import history from './history';

import Login from './components/auth/login';
import Home from './components/home';
import Products from './components/products/products';
import Clients from './components/clients/clients';
import Client from './components/clients/client';
import OrderNew from './components/orders/orderNew';

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/home' component={Home} />
                    <Route path='/products' component={Products} />
                    <Route path='/clients' component={Clients} />
                    <Route path='/client/:id' component={Client} />
                    <Route path='/order/new' component={OrderNew} />
                </Switch>
            </App>
        </Router>
    </Provider>
    , document.querySelector('.app-wrapper'));
}

document.addEventListener('DOMContentLoaded', main);
