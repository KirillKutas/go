import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteRequirement } from './DeleteRequirement';
import { CreateRequirement } from './CreateRequirement';
import { DeleteImage } from './DeleteImage';
import { Notification } from './../elements/Notification';
import { Image } from './../elements/Image';

export class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            productName: "",
            productYearOfIssue: 0,
            productDeveloper: "",
            productCost: 0,
            productImage: "",
            productDescription: "",
            productCategories: "Симуляторы",
            notificationStatus: false,
            notificationMessage: "",
            images: null,
            flag: true
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
                this.setState({ productImage: val, flag: true });
            } else {
                this.setState({ flag: false });
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

        if (this.state.flag) {
            const response = await fetch("api/Product/update", {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: this.state.product.id,
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

            if (response.ok === false) {
                this.setState({
                    notificationStatus: false,
                    notificationMessage: "Продукт составлен некорректно!"
                });
            }
            else {
                this.setState({
                    notificationStatus: response.ok,
                    notificationMessage: result.message
                });
            }
        } else {
            alert("Unkonw image format");
        }
        
    }

    async loadData() {
        const response = await fetch("api/Product/getById/" + this.props.match.params.id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            this.setState({
                product: result,
                productName: result.name,
                productYearOfIssue: result.yearOfIssue,
                productDeveloper: result.developer,
                productCost: result.cost,
                productImage: result.image,
                productDescription: result.description,
                productCategories: result.categories
            });
        }
    }

    async loadImages() {
        const response = await fetch("api/Image/getAll/" + this.props.match.params.id, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        let result = await response.json();

        this.setState({ images: result });
    }

    async componentDidMount() {
        await this.loadData();
        await this.loadImages();
    }

    renderImages() {
        if (this.state.images != null) {
            return (
                this.state.images.map(function (item) {
                    return (
                        <div key={item.id} className="card">
                            <img src={item.url} className="card-img-top" alt="..." />
                            <div className="card-footer">
                                <DeleteImage data={item.id} />
                            </div>
                        </div>
                    )
                })
            )
        }

        return (<></>)
    }

    renderProductRequirement(req) {
        if (req != undefined) {
            return (
                <>
                    <p className="card-text"><b>Операционная система: </b> {this.state.product.os}</p>
                    <p className="card-text"><b>Процессор: </b> {this.state.product.processor}</p>
                    <p className="card-text"><b>Видео-карта: </b> {this.state.product.videoCard}</p>
                    <p className="card-text"><b>Оперативная память: </b> {this.state.product.ram} Гб</p>
                    <p className="card-text"><b>Свободное место на диске: </b> {this.state.product.freeHardDiskSpace} Гб</p>
                    <hr />
                    <DeleteRequirement data={this.state.product.requirementId} />
                </>
            )
        }
        else {
            return (
                <>
                    <p className="card-text text-warning">Требования отсутсвуют</p>
                    <hr />
                    <CreateRequirement data={this.props.match.params.id} />
                </>
            )
        }
    }

    renderProduct(prod) {
        let requirement = this.state.product.requirementId;
        requirement = this.renderProductRequirement(requirement);

        if (prod.name != null) {
            return (
                <>
                    <div className="card">
                        <img src={this.state.productImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{this.state.productName}</h5>
                            <p className="card-text"><b>Год выпуска: </b> {this.state.productYearOfIssue}</p>
                            <p className="card-text"><b>Разработчик: </b> {this.state.productDeveloper}</p>
                            <p className="card-text"><b>Жанр: </b> {this.state.productCategories}</p>
                            <p className="card-text"><b>Цена: </b> {this.state.productCost} руб.</p>
                            <p className="card-text"><b>Описание: </b></p>
                            <p className="card-text">{this.state.productDescription}</p>
                            <hr />
                            <h5 className="card-title">Требования: </h5>
                            {requirement}
                        </div>
                    </div>
                </>
            )
        }

    }

    render() {
        let product = this.state.product;
        product = this.renderProduct(product);

        return (
            <>
                <h1>Изменение товара</h1>
                <hr />

                <div className="row">
                    <div className="col-md-6">
                        <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Название</label>
                                <input required maxlength="40" type="text" placeholder="Например: Valorant" className="form-control" value={this.state.productName} onChange={this.onChangeProductName} id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="yearOfIssue">Год выпуска</label>
                                <input required type="number" placeholder="Например: 2020" min="1970" max="2020" className="form-control" value={this.state.productYearOfIssue} onChange={this.onChangeProductYearOfIssue} id="yearOfIssue" />
                                <small className="form-text text-muted">Вводите данные от 1970 до 2020</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="developer">Разработчик</label>
                                <input required maxlength="40" type="text" placeholder="Например: RIOT" className="form-control" onChange={this.onChangeProductDeveloper} value={this.state.productDeveloper} id="developer" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cost">Цена</label>
                                <input required type="number" placeholder="Например: 145.00" min="1" max="10000" className="form-control" value={this.state.productCost} onChange={this.onChangeProductCost} id="cost" />
                                <small className="form-text text-muted">Вводите данные от 1 до 10000</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Изображение</label>
                                <input required type="text" placeholder="Например: https://image.png" className="form-control" value={this.state.productImage} onChange={this.onChangeProductImage} id="image" />
                                <small className="form-text text-muted">Вставьте ссылку из Интернета</small>
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
                                <textarea required maxlength="300" className="form-control" onChange={this.onChangeProductDescription} value={this.state.productDescription} id="description"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Изменить</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        {product}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <h2>Изображения: </h2>
                        <Image data={this.props.match.params.id} />
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-columns">
                            {this.renderImages()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
