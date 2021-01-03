import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from './../Notification'

export class Products extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: {}
        };
    }

    async getProducts() {
        const response = await fetch("/api/Product/getAll", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json()
            this.setState({ products: result });
        }
    }

    async componentDidMount() {
        await this.getProducts();
    }

    renderProduct() {
        if (this.state.products.length !== undefined) {
            return (
                this.state.products.map(function (item) {
                    let isValidText = "Не валиден";
                    var textStyle = { color: "red" };

                    if (item.isCorrect != false) {
                        isValidText = "Валиден";
                        textStyle = { color: "green" };
                    }

                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.yearOfIssue}</td>
                            <td>{item.developer}</td>
                            <td style={textStyle}>{isValidText}</td>

                            <td><Link className="btn btn-outline-warning" to={`/updateProduct/${item.id}`}>Изменить</Link></td>
                            <td><Link className="btn btn-outline-danger" to={`/deleteProduct/${item.id}`}>Удалить</Link></td>
                        </tr>
                    )
                })
            )
        }
    }

    render() {
        return (
            <>
                <tbody>
                    {
                        this.renderProduct()
                    }
                </tbody>
            </>
        );
    }
}
