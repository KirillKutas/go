import React from 'react';

export class OrderButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        const response = await fetch("api/Order/create", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: this.props.product.id,
                productName: this.props.product.name,
                productImage: this.props.product.image,
                productCost: this.props.product.cost
            })
        });

        let result = await response.json();

        alert(result.message);

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 1500);
    }

    renderOrderButton() {
        if (this.props.user !== undefined) {
            if (this.props.user.role !== "admin" && this.props.user.role === "user") {
                //if (this.props.product.isOrder !== true) {
                return (
                    <div className="card">
                        <div className="card-body text-center">
                            <button className="btn btn-outline-warning" onClick={this.handleSubmit}>Добавить в избранное</button>
                        </div>
                    </div>
                )
                //}
            }
        }

        return (
            <></>
        )
    }

    render() {
        return (
            <>
                {this.renderOrderButton()}
            </>
        );
    }
}
