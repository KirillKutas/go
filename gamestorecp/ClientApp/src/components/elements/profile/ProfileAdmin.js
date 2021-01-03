import React from 'react';
import { ProductsList } from './ProductsList';
import { Link } from 'react-router-dom';

export class ProfileAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Заказы</h1>
                <Link className="btn btn-outline-dark" to="/ordersAdmin">Посмотреть заказы</Link>
                <hr />
                <h1>Создание товара</h1>
                <hr />

                <div className="card">
                    <div className="card-body">
                        <ProductsList />
                    </div>
                </div>
            </>
        );
    }
}
