import React from 'react';
import { Notification } from './../Notification'

export class ProductCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: "",
            productYearOfIssue: 0,
            productDeveloper: "",
            productCost: 0,
            productImage: "",
            productDescription: "",
            productCategories: "Симуляторы",
            notificationStatus: false,
            notificationMessage: ""
        }

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductYearOfIssue = this.onChangeProductYearOfIssue.bind(this);
        this.onChangeProductDeveloper = this.onChangeProductDeveloper.bind(this);
        this.onChangeProductCost = this.onChangeProductCost.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductCategories = this.onChangeProductCategories.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeProductName(e) {
        let val = e.target.value;
        this.setState({ productName: val });
    }

    onChangeProductYearOfIssue(e) {
        let val = e.target.value;
        this.setState({ productYearOfIssue: val });
    }

    onChangeProductDeveloper(e) {
        let val = e.target.value;
        this.setState({ productDeveloper: val });
    }

    onChangeProductCost(e) {
        let val = e.target.value;
        this.setState({ productCost: val });
    }

    onChangeProductImage(e) {
        try {
            let val = e.target.value;
            let res = val.match(/jpeg|png|jpg/g);
            if (res != null) {
                this.setState({ productImage: val });
            } else {
                throw 'error';
            }
        }
        catch (e) {
            console.log('error');
        }
        
    }

    onChangeProductDescription(e) {
        let val = e.target.value;
        this.setState({ productDescription: val });
    }

    onChangeProductCategories(e) {
        let val = e.target.value;
        this.setState({ productCategories: val });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.productImage !== "") {
            const response = await fetch("api/Product/create",
                {
                    method: "POST",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: this.state.productName,
                        yearOfIssue: parseInt(this.state.productYearOfIssue),
                        developer: this.state.productDeveloper,
                        cost: parseInt(this.state.productCost),
                        image: this.state.productImage,
                        description: this.state.productDescription,
                        Categories: this.state.productCategories
                    })
                });

            let result = await response.json();

            this.setState({
                notificationStatus: response.ok,
                notificationMessage: result.message
            });
        } else {
            alert("Unknown image format");
        }

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }

    render() {
        return (
            <>
                <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Название</label>
                        <input required maxlength="40" type="text" placeholder="Например: Valorant" className="form-control" onChange={this.onChangeProductName} id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="yearOfIssue">Год выпуска</label>
                        <input required type="number" placeholder="Например: 2020" min="1970" max="2020" className="form-control" onChange={this.onChangeProductYearOfIssue} id="yearOfIssue" />
                        <small className="form-text text-muted">Вводите данные от 1970 до 2020</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="developer">Разработчик</label>
                        <input required maxlength="40" type="text" placeholder="Например: RIOT" className="form-control" onChange={this.onChangeProductDeveloper} id="developer" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost">Цена</label>
                        <input required type="number" placeholder="Например: 145.00" min="1" max="10000" className="form-control" onChange={this.onChangeProductCost} id="cost" />
                        <small className="form-text text-muted">Вводите данные от 1 до 10000</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Изображение</label>
                        <input required type="text" placeholder="Например: https://image.png" className="form-control" onChange={this.onChangeProductImage} id="image" />
                        <small className="form-text text-muted">Вставьте ссылку на изображение из Интернета</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categories">Категории</label>
                        <select class="form-control" onClick={this.onChangeProductCategories} id="categories">
                            <option select value="Симуляторы">Симуляторы</option>
                            <option value="Стратегии">Стратегии</option>
                            <option value="Шутер">Шутер</option>
                            <option value="Спортивные">Спортивные</option>
                            <option value="Приключения">Приключения</option>
                            <option value="Ролевые игры">Ролевые игры</option>
                            <option value="Головоломки">Головоломки</option>
                            <option value="Настольные">Настольные</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea required maxlength="300" className="form-control" onChange={this.onChangeProductDescription} id="description"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </>
        );
    }
}
