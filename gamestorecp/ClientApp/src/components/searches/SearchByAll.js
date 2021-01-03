import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SearchByAll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            yearOfIssue: 0,
            cost: 0,
            developer: "",
            categories: "Симуляторы",
            t: ""
        }

        this.onChangeYearOfIssue = this.onChangeYearOfIssue.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeDeveloper = this.onChangeDeveloper.bind(this);
        this.onChangeCategories = this.onChangeCategories.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeYearOfIssue(e) {
        let val = e.target.value;
        this.setState({ yearOfIssue: val });
    }

    onChangeCost(e) {
        let val = e.target.value;
        this.setState({ cost: val });
    }

    onChangeDeveloper(e) {
        let val = e.target.value;
        this.setState({ developer: val });
    }

    onChangeCategories(e) {
        let val = e.target.value;
        this.setState({ categories: val });
    }

    onSearch() {
        let item = {
            yearOfIssue: parseInt(this.state.yearOfIssue),
            cost: parseInt(this.state.cost),
            developer: this.state.developer,
            categories: this.state.categories
        }

        this.props.filter(item);
    }

    render() {
        return (
            <form>
                <div class="form-group">
                    <label htmlFor="yearOfIssue">Год выпуска: </label>
                    <input type="number" min="1970" max="2020" onChange={this.onChangeYearOfIssue} class="form-control" id="yearOfIssue" placeholder="2020" />
                </div>
                <div class="form-group">
                    <label htmlFor="cost">Разработчик: </label>
                    <input type="text" class="form-control" onChange={this.onChangeDeveloper} id="yearOfIssue" placeholder="Valve" />
                </div>
                <div class="form-group">
                    <label htmlFor="categories">Жанр: </label>
                    <select class="form-control" onClick={this.onChangeCategories} id="categories">
                        <option value="Симуляторы">Симуляторы</option>
                        <option value="Стратегии">Стратегии</option>
                        <option value="Шутер">Шутер</option>
                        <option value="Спортивные">Спортивные</option>
                        <option value="Приключения">Приключения</option>
                        <option value="Ролевые игры">Ролевые игры</option>
                        <option value="Головоломки">Головоломки</option>
                        <option value="Настольные">Настольные</option>
                    </select>
                </div>
                <div class="form-group">
                    <label htmlFor="cost">Цена: </label>
                    <input type="number" min="1" max="10000" onChange={this.onChangeCost} class="form-control" id="yearOfIssue" placeholder="145.00" />
                </div>
                <button type="button" onClick={this.onSearch} className="btn btn-outline-warning w-100">Поиск по критериям</button>
            </form>
        )
    }
}