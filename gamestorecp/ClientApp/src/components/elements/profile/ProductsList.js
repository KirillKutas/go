import React from 'react';
import { ProductCreate } from './ProductCreate';
import { Products } from './Products';

export class ProductsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: {}
        };
    }

    render() {
        return (
            <>
                <ProductCreate />

                <br />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Год выпуска</th>
                            <th>Разработчик</th>
                            <th>Валидность</th>
                            <th>Изменить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>

                    <Products />
                </table>
            </>
        );
    }
}
