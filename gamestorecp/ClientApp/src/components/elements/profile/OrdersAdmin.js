import React from 'react';
import { ProductsList } from './ProductsList';
import { Link } from 'react-router-dom';

export class OrdersAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsBought: {}
        }
    }

    async getProductsBought() {
        const response = await fetch("/api/Order/getAllBoughtProducts", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            this.setState({ productsBought: result });
        }
    }

    async componentDidMount() {
        await this.getProductsBought();
    }

    renderProductsBought() {
        if (this.state.productsBought.length !== undefined) {
            return (
                this.state.productsBought.map(function (item) {
                    return (
                        <tr key={item.id}>
                            <td>{item.orderId}</td>
                            <td>{item.orderCreated}</td>
                            <td>{item.productName}</td>
                            <td>{item.userName}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.dostavka}</td>
                            <td>{item.oplata}</td>
                            <td>{item.cost}</td>
                            <td><Link className="btn btn-outline-dark" to={`/detailProduct/${item.productId}`}>Перейти</Link></td>
                        </tr>
                    )
                })
            )
        }

        return (<></>)
    }

    render() {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Домашняя страница</Link></li>
                        <li className="breadcrumb-item"><Link to="/Profile">Профиль</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Заказы</li>
                    </ol>
                </nav>
                <hr />
                <h1>Заказы</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Время заказа</th>
                            <th>Продукт</th>
                            <th>Клиент</th>
                            <th>Адрес</th>
                            <th>Телофон</th>
                            <th>Доставка</th>
                            <th>Оплата</th>
                            <th>Стоимость</th>

                            <th></th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.renderProductsBought()}
                    </tbody>
                </table>
            </>
        );
    }
}
