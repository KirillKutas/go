import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchByAll } from './searches/SearchByAll'
import { SearchByName } from './searches/SearchByName'
 
class Item extends React.Component {
    render() {
        return (
            <Link className="text-dark" to={`/detailProduct/${this.props.data.id}`}>
                <div className="card">
                    <img src={this.props.data.image} style={{ height: "250px" }} class="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.data.name}</h5>
                        <p className="card-text"><b>Год выпуска: </b> {this.props.data.yearOfIssue}</p>
                        <p className="card-text"><b>Разработчик: </b> {this.props.data.developer}</p>
                        <p className="card-text"><b>Жанр: </b> {this.props.data.categories}</p>
                        <p className="card-text"><b>Цена: </b> {this.props.data.cost} руб.</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            productsAll: {},
            productsNew: {}
        }

        this.filterProductsByName = this.filterProductsByName.bind(this);
        this.filterProductsByAll = this.filterProductsByAll.bind(this);
    }

    filterProductsByName(text) {
        let items = this.state.productsAll;

        var filteredList = items.filter(function (item) {
            if (item.name.toLowerCase().includes(text) && item.isCorrect === true)
                return item;
        });

        this.setState({ productsNew: filteredList });
    }

    filterProductsByAll(e) {
        let items = this.state.productsAll;

        var filteredList = items.filter(function (item) {
            if (item.yearOfIssue === e.yearOfIssue ||
                item.cost === e.cost ||
                item.developer.toLowerCase() === e.developer.toLowerCase() ||
                item.categories.toLowerCase().includes(e.categories.toLowerCase()))
                return item;
        });

        this.setState({ productsNew: filteredList });
    }

    async getProducts() {
        const response = await fetch("/api/Product/getAll", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json()
            this.setState({ productsAll: result });
        }
    }

    async componentDidMount() {
        await this.getProducts();
    }

    renderProducts() {
        if (this.state.productsNew.length === undefined) {
            if (this.state.productsAll.length !== undefined) {
                return (
                    this.state.productsAll.map(function (item) {
                        if (item.isCorrect === true) {
                            return (
                                <Item key={item.id} data={item} />
                            )
                        }
                    })
                )
            }
        }
        else {
            return (
                this.state.productsNew.map(function (item) {
                    if (item.isCorrect === true) {
                        return (
                            <Item key={item.id} data={item} />
                        )
                    }
                })
            )
        }
    }

    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Домашняя страница</li>
                    </ol>
                </nav>

                <SearchByName filter={this.filterProductsByName} />

                <div className="row">
                    <div className="col-md-3">
                        <SearchByAll filter={this.filterProductsByAll} />
                    </div>

                    <div className="col-md-9">
                        <div className="card-columns">
                            {this.renderProducts()}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
