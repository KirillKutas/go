import React, { Component } from 'react';
import { Notification } from './elements/Notification'
import { Redirect } from "react-router-dom";

export class Registration extends Component {
    static displayName = Registration.name;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
            firstName: "",
            lastName: "",
            notificationStatus: false,
            notificationMessage: "",
            redirect: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
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

    onChangePasswordRepeat(e) {
        var val = e.target.value;
        this.setState({ passwordRepeat: val });
    }

    onChangeFirstName(e) {
        var val = e.target.value;
        this.setState({ firstName: val });
    }

    onChangeLastName(e) {
        var val = e.target.value;
        this.setState({ lastName: val });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.password === this.state.passwordRepeat) {
            const response = await fetch("api/Account/register",
                {
                    method: "POST",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName
                    })
                });

            let result = await response.json();

            this.setState({ notificationStatus: response.ok, notificationMessage: result.message });
            if (response.status === 200) {
                this.setState({ redirect: true });
            }
        } else {
            alert("Пароли не совпадают");
        }
        

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/Login" />;
        }
        return (
            <div>
                <h1>Регистрация</h1>
                <hr />

                <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input required maxlength="100" type="email" placeholder="Например: user@gmail.com" className="form-control" onChange={this.onChangeEmail} id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">Имя</label>
                        <input required maxlength="100" type="firstName" placeholder="Например: Александр" className="form-control" onChange={this.onChangeFirstName} id="firstName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <input required maxlength="100" type="lastName" placeholder="Например: Сойкель" className="form-control" onChange={this.onChangeLastName} id="lastName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input required maxlength="100" type="password" className="form-control" onChange={this.onChangePassword} id="password" aria-describedby="passwordHelp" />
                        <small id="passwordHelp" className="form-text text-muted">Никогда не делитесь своим паролем с кем-нибудь еще.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Подтвердите пароль</label>
                        <input required maxlength="100" type="password" className="form-control" onChange={this.onChangePasswordRepeat} id="passwordRepeat" aria-describedby="passwordHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary">Регистрация</button>
                </form>
            </div>
        );
    }
}
