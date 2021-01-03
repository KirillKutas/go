import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from './elements/Notification';

export class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsNotBought: {},
            oplata: "Картой",
            dostavka: "Курьером",
            cost: 0,
            phone: "",
            address: "",
            notificationStatus: false,
            notificationMessage: ""
        }

        this.onChangeOplata = this.onChangeOplata.bind(this);
        this.onChangeDostavka = this.onChangeDostavka.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeOplata(e) {
        let val = e.target.value;
        this.setState({ oplata: val });
    }

    onChangeDostavka(e) {
        let val = e.target.value;
        this.setState({ dostavka: val });
    }

    onChangeCost(e) {
        let val = e.target.value;
        this.setState({ cost: val });
    }

    onChangePhone(e) {
        let val = e.target.value;
        this.setState({ phone: val });
    }

    onChangeAddress(e) {
        let val = e.target.value;
        this.setState({ address: val });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let data = {
            orders: this.state.productsNotBought,
            oplata: this.state.oplata,
            dostavka: this.state.dostavka,
            cost: parseInt(this.state.cost),
            phone: this.state.phone,
            address: this.state.address
        }

        const response = await fetch("api/Order/buy", {
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                orders: this.state.productsNotBought,
                oplata: data.oplata,
                dostavka: data.dostavka,
                cost: data.cost,
                phone: data.phone,
                address: data.address
            })
        });

        let result = await response.json();

        this.setState({
            notificationStatus: response.ok,
            notificationMessage: result.message
        });

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }

    async getProductsNotBought() {
        const response = await fetch("/api/Order/getByUserIdNotBought", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            this.setState({ productsNotBought: result, cost: result[0]?.totalCost });
        }
    }

    async componentDidMount() {
        await this.getProductsNotBought();
    }

    renderForm() {
        if (this.state.productsNotBought.length > 0) {
            return (
                <>
                    <h1>Покупка товара</h1>
                    <h3>Общая стоимость: {this.state.cost}</h3>

                    <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Способ оплаты: </label>
                            <select className="form-control" onClick={this.onChangeOplata} id="categories">
                                <option defaultValue="Картой">Картой</option>
                                <option defaultValue="Наличными">Наличными</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Доставка: </label>
                            <input type="text" disabled placeholder="Курьером" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Телефон: </label>
                            <input required maxlength="30" type="phone" placeholder="Например: +375(29)299-99-99" className="form-control" onChange={this.onChangePhone} />
                            <small>Пожалуйста, укажите номер телефона, если доставка курьером</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Адрес: </label>
                            <input required maxlength="100" type="address" placeholder="Например: ул. Свердлова 31" className="form-control" onChange={this.onChangeAddress} />
                            <small>Пожалуйста, укажите адрес, если доставка курьером</small>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Купить</button>
                    </form>
                </>
            )
        }

        return (
            <>
                <div class="alert alert-success" role="alert">
                    Товар успешно куплен!
                    </div>
                <Link className="btn btn-outline-primary" to={`/Profile`}>Назад</Link>
            </>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div >
        );
    }
}
