import React, { Component } from 'react';
import { render } from 'react-dom';
import { Notification } from './elements/Notification'
import { Redirect } from "react-router-dom";

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            notificationStatus: false,
            notificationMessage: "",
            redirect: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeEmail(e) {
        var val = e.target.value;
        this.setState({ email: val });
    }

    onChangePassword(e) {
        var val = e.target.value;
        this.setState({ password: val });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("api/Account/login", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });

        let result = await response.json();
        this.setState({ notificationStatus: response.ok, notificationMessage: result.message });
        if (response.status === 200) {
            this.setState({ redirect: true });
        }

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <h1>Авторизация</h1>
                <hr />

                <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input required maxlength="100" type="email" placeholder="Например: email@gmail.com" className="form-control" onChange={this.onChangeEmail} id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input required maxlength="100" type="password" className="form-control" onChange={this.onChangePassword} id="password" aria-describedby="passwordHelp" />
                        <small id="passwordHelp" className="form-text text-muted">Никогда не делитесь своим паролем с кем-нибудь еще.</small>
                    </div>

                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
            </div>
        );
    }
}
