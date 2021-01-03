import React from 'react';
import { Link } from 'react-router-dom';

export class DeleteImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        const response = await fetch("api/Image/delete/" + this.props.data, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });
    }

    render() {
        return (
            <>
                <form className="text-center" onSubmit={this.handleSubmit}>
                    <input type="submit" className="btn btn-outline-danger" value="Удалить" />
                </form>
            </>
        );
    }
}
