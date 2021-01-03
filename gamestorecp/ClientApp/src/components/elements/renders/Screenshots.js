import React from 'react';
import { Link } from 'react-router-dom';

export class Screenshots extends React.Component {
    constructor(props) {
        super(props);
    }

    renderScreenshots() {
        if (this.props.images != null) {
            return (
                this.props.images.map(function (item) {
                    return (
                        <div key={item.id} className="card">
                            <img style={{ cursor: "pointer" }} src={item.url} onClick={() => window.open(item.url, "_blank")} className="card-img-top" alt="..." />
                        </div>
                    )
                })
            )
        }

        return (<><h4 className="text-warning">Скриншотов нет!</h4></>)
    }

    render() {
        return (
            <>
                {this.renderScreenshots()}
            </>
        );
    }
}
