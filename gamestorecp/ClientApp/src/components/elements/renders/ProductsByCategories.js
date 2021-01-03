import React from 'react';
import { Link } from 'react-router-dom';

export class ProductsByCategories extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProductsByCategories() {
        if (this.props.productCategories != null && this.props.productCategories.length > 1) {
            return (
                this.props.productCategories.map(function (item) {
                    return (
                        <Link key={item.id} class="list-group-item list-group-item-action" to="">{item.name}</Link>
                    )
                })
            )
        }

        return (
            <>
                <Link class="list-group-item list-group-item-action">Игры отсутствуют!</Link>
            </>
        )
    }

    render() {
        return (
            <>
                {this.renderProductsByCategories()}
            </>
        );
    }
}
