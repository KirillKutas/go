import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class SearchByName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }

        this.onTextChanged = this.onTextChanged.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onTextChanged(e) {
        var newText = e.target.value.trim();
        this.setState({ text: newText });
    }

    onSearch() {
        this.props.filter(this.state.text);
    }

    render() {
        return (
            <div class="input-group mb-3">
                <input type="text" class="form-control" onChange={this.onTextChanged} placeholder="Поиск" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={this.onSearch} type="button">Поиск</button>
                </div>
            </div>
        );
    }
}