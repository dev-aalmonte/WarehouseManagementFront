import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(compose((window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)));

// import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';

import history from './history';
import requireAuth from './components/middleware/requireAuth';

import Login from './components/auth/login';
import Home from './components/home';
import Products from './components/products/products';
import Clients from './components/clients/clients';
import Client from './components/clients/client';
import OrderNew from './components/orders/orderNew';
import OrderDetail from './components/orders/orderDetail';
import OrderSearch from './components/orders/orderSearch';

import Users from './components/users/users';
import Warehouses from './components/warehouses/warehouses';
import WarehouseDetail from './components/warehouses/warehouseDetail';

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/home' component={requireAuth(Home)} />
                    <Route path='/products' component={requireAuth(Products)} />
                    <Route path='/clients' component={requireAuth(Clients)} />
                    <Route path='/client/:id' component={requireAuth(Client)} />
                    <Route path='/order/new' component={requireAuth(OrderNew)} />
                    <Route path='/order/search/:id' component={requireAuth(OrderSearch)} />
                    <Route path='/order/:id' component={requireAuth(OrderDetail)} />

                    <Route path='/users' component={requireAuth(Users)} />
                    <Route path='/warehouses' component={requireAuth(Warehouses)} />
                    <Route path='/warehouse/:id' component={requireAuth(WarehouseDetail)} />
                </Switch>
            </App>
        </Router>
    </Provider>
    , document.querySelector('.app-wrapper'));
}

document.addEventListener('DOMContentLoaded', main);
