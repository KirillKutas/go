import React from 'react';

export class BuyButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        const response = await fetch("api/Order/buy", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                orders: this.props.data
            })
        });

        setInterval(function () {
            window.location.reload();
            return false;
        }, 1500);
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" className="btn btn-outline-success" />
                </form>
            </>
        );
    }
}
