import React from 'react';

export class Notification extends React.Component {

    constructor(props) {
        super(props);

    }

    renderNotification() {
        if (this.props.message !== "" && this.props.message !== undefined) {
            if (this.props.status === true) {
                return (
                    <div class="alert alert-success" role="alert">
                        {this.props.message}
                    </div>
                );
            }
            else {
                return (
                    <div class="alert alert-danger" role="alert">
                        {this.props.message}
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <>
                {this.renderNotification()}
            </>
        );
    }
}
