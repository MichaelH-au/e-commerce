import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./components/Header/Header";
import NavBread from "./components/NavBread/NavBread";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Home from "./containers/Home/Home";
import Register from "./containers/user/Register";
import Login from "./containers/user/Login";
import Cart from './containers/Cart/Cart'
import Address from './containers/Address/Address'
import OrderConfirm from './containers/OrderConfirm'
import OrderCompleted from './containers/OrderCompleted/OrderCompleted'
import Footer from './components/Footer/Footer'
import AuthRoute from './containers/AuthRoute'
import Account from './containers/MyAccount'
import MyShop from './containers/MyShop'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header/>
                <NavBread/>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/register' exact component={Register}></Route>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/cart' exact component={Cart}></Route>
                    <Route path='/address' exact component={Address}></Route>
                    <Route path='/orderconfirm' exact component={OrderConfirm}></Route>
                    <Route path='/ordercompleted' exact component={OrderCompleted}></Route>
                    <Route path='/account' exact component={Account}></Route>
                    <Route path='/myShop' exact component={MyShop}></Route>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
