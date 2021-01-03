import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Profile } from './components/Profile';
import { UpdateProduct } from './components/elements/UpdateProduct';
import { DeleteProduct } from './components/elements/DeleteProduct';
import { ProductInfo } from './components/ProductInfo';
import { Order } from './components/Order';
import { OrdersAdmin } from './components/elements/profile/OrdersAdmin';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Registration' component={Registration} />
                <Route exact path='/Profile' component={Profile} />
                <Route exact path='/Order' component={Order} />
                <Route exact path='/updateProduct/:id' component={UpdateProduct} />
                <Route exact path='/deleteProduct/:id' component={DeleteProduct} />
                <Route exact path='/detailProduct/:id' component={ProductInfo} />
                <Route exact path='/ordersAdmin' component={OrdersAdmin} />
            </Layout>
        );
    }
}
