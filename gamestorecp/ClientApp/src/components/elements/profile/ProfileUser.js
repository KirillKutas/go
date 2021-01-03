import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOrder } from './../DeleteOrder';

export class ProfileUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsBought: {},
            productsNotBought: {}
        }
    }

    async getProductsBought() {
        const response = await fetch("/api/Order/getByUserIdBought", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            this.setState({ productsBought: result });
        }
    }

    async getProductsNotBought() {
        const response = await fetch("/api/Order/getByUserIdNotBought", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            this.setState({ productsNotBought: result });
        }
    }

    async componentDidMount() {
        await this.getProductsBought();
        await this.getProductsNotBought();
    }

    renderProductsNotBought() {
        if (this.state.productsNotBought.length !== undefined) {
            return (
                this.state.productsNotBought.map(function (item) {
                    return (
                        <div key={item.id} className="card">
                            <Link className="text-dark" to={`/detailProduct/${item.productId}`}>
                                <img src={item.productImage} style={{ height: "250px" }} class="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-title">{item.productName}</p>
                                    <p className="card-text"><b>Цена:</b> {item.cost} руб.</p>
                                </div>
                            </Link>
                            <div className="card-footer text-center">
                                <DeleteOrder data={item.id} />
                            </div>
                        </div>
                    )
                })
            )
        }

        return (<></>)
    }

    renderProductsBought() {
        if (this.state.productsBought.length !== undefined) {
            return (
                this.state.productsBought.map(function (item) {
                    return (
                        <div key={item.id} className="card">
                            <Link className="text-dark" to={`/detailProduct/${item.productId}`}>
                                <img src={item.productImage} style={{ height: "250px" }} class="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.productName}</h5>
                                </div>
                            </Link>
                        </div>
                    )
                })
            )
        }

        return (<></>)
    }

    renderButtonBuy() {
        if (this.state.productsNotBought.length > 0) {
            return (
                <>
                    <Link className="btn btn-outline-success" to="/Order">Купить</Link>
                    <hr />
                </>
            )
        }
    }

    render() {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Домашняя страница</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Профиль</li>
                    </ol>
                </nav>
                <hr />
                <h1>Избранные игры</h1>
                <div className="card-columns">
                    {this.renderProductsNotBought()}
                </div>
                <hr />
                {this.renderButtonBuy()}
                <h1>Купленные игры</h1>
                <div className="card-columns">
                    {this.renderProductsBought()}
                </div>
            </>
        );
    }
}
