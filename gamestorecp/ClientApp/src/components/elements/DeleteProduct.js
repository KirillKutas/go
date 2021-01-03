import React from 'react';
import { Link } from 'react-router-dom';

export class DeleteProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        const response = await fetch("api/Product/delete/" + this.props.match.params.id, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });
    }

    async loadData() {
        const response = await fetch("api/Product/getById/" + this.props.match.params.id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();

            this.setState({ product: result });
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderProductRequirement(req) {
        if (req != null) {
            return (
                <>
                    <hr />
                    <h5 className="card-title">Требования: </h5>
                    <p className="card-text"><b>Операционная система: </b> { }</p>
                    <p className="card-text"><b>Процессор: </b> { }</p>
                    <p className="card-text"><b>Видео-карта: </b> { }</p>
                    <p className="card-text"><b>Оперативная память: </b> { }</p>
                    <p className="card-text"><b>Свободное место на диске: </b> { }</p>
                </>
            )
        }
    }

    renderProduct(prod) {
        let requirement = this.state.product.requirement;
        requirement = this.renderProductRequirement(requirement);

        if (prod.name != null) {
            return (
                <>
                    <div className="card">
                        <img src={this.state.product.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{this.state.product.name}</h5>
                            <p className="card-text"><b>Год выпуска: </b> {this.state.product.yearOfIssue}</p>
                            <p className="card-text"><b>Разработчик: </b> {this.state.product.developer}</p>
                            <p className="card-text"><b>Жанр: </b> {this.state.product.categories}</p>
                            <p className="card-text"><b>Цена: </b> {this.state.product.cost} руб.</p>
                            <p className="card-text"><b>Описание: </b></p>
                            <p className="card-text">{this.state.product.description}</p>
                            {requirement}
                        </div>
                    </div>

                    <hr />

                    <div className="card mb-3">
                        <div className="card-header text-center">
                            <h2>Вы уверены, что хотите удалить данный продукт?</h2>
                        </div>
                        <div className="card-body">
                            <form className="text-center" onSubmit={this.handleSubmit}>
                                <input type="submit" className="btn btn-outline-danger" value="Удалить" />
                            </form>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div class="alert alert-success" role="alert">
                        Товар успешно удален!
                    </div>
                    <Link className="btn btn-outline-primary" to={`/Profile`}>Назад</Link>
                </>
            )
        }
    }

    render() {
        let product = this.state.product;
        product = this.renderProduct(product);

        return (
            <>
                <h1>Удаление товара</h1>
                <hr />

                {product}
            </>
        );
    }
}
