import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Screenshots } from './elements/renders/Screenshots';
import { ProductsByCategories } from './elements/renders/ProductsByCategories';
import { OrderButton } from './elements/renders/OrderButton';

export class ProductInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            productYearOfIssue: 0,
            productDeveloper: "",
            productCost: 0,
            productImage: "",
            productDescription: "",
            productCategories: "",
            notificationStatus: false,
            notificationMessage: "",
            product: {},
            images: null,
            productCategories: {},
            user: {}
        }

    }

    async loadProductData() {
        const response = await fetch("api/Product/getById/" + this.props.match.params.id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            console.log(result);
            this.setState({
                product: result
            });
        }
    }

    async loadImagesData() {
        const response = await fetch("api/Image/getAll/" + this.props.match.params.id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        let result = await response.json();

        this.setState({ images: result });
    }

    async loadProductByCategoriesData() {
        const response = await fetch("api/Product/getByCategories/" + this.state.product.categories, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();

            console.log(result);

            this.setState({
                productCategories: result
            });
        }
    }

    async loadProfileData() {
        const response = await fetch("/api/account/getProfile", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            console.log(result);
            this.setState({
                user: result
            });
        }
    }

    async componentDidMount() {
        await this.loadProductData();
        await this.loadImagesData();
        await this.loadProductByCategoriesData();
        await this.loadProfileData();
    }

    render() {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Домашняя страница</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Игра: {this.state.product.name}</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-8">
                        <div class="card mb-3">
                            <img src={this.state.product.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{this.state.product.name}</h5>
                                <p className="card-text"><b>Год выпуска: </b> {this.state.product.yearOfIssue}</p>
                                <p className="card-text"><b>Разработчик: </b> {this.state.product.developer}</p>
                                <p className="card-text"><b>Жанр: </b> {this.state.product.categories}</p>
                                <p className="card-text"><b>Цена: </b> {this.state.product.cost} руб.</p>
                                <hr />
                                <h5 className="card-title">Требования: </h5>
                                <p className="card-text"><b>Операционная система: </b> {this.state.product.os}</p>
                                <p className="card-text"><b>Процессор: </b> {this.state.product.processor}</p>
                                <p className="card-text"><b>Видео-карта: </b> {this.state.product.videoCard}</p>
                                <p className="card-text"><b>Оперативная память: </b> {this.state.product.ram} Гб</p>
                                <p className="card-text"><b>Свободное место на диске: </b> {this.state.product.freeHardDiskSpace} Гб</p>
                                <hr />
                                <h5 className="card-text">Описание игры:</h5>
                                <p className="card-text">{this.state.product.description}</p>
                                <hr />
                                <h5>Скриншоты игры:</h5>
                                <div className="card-columns">
                                    <Screenshots images={this.state.images} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <OrderButton product={this.state.product} user={this.state.user} />

                        <div className="card">
                            <div className="card-header">
                                <b>Похожие игры</b>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <ProductsByCategories productCategories={this.state.productCategories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
