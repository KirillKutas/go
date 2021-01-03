import React, { Component } from 'react';
import { Notification } from './Notification'

export class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationStatus: false,
            notificationMessage: "",
            image: ""
        }

        this.handleAddImage = this.handleAddImage.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    async handleAddImage(e) {
        e.preventDefault();

        if (this.state.image !== "") {
            const response = await fetch("api/Image/create",
                {
                    method: "POST",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: this.state.image,
                        productId: parseInt(this.props.data)
                    })
                });

            let result = await response.json();

            if (response.ok === false) {
                this.setState({
                    notificationStatus: false,
                    notificationMessage: "Ошибка сервера!",
                    image: ""
                });
            } else {
                this.setState({
                    notificationStatus: response.ok,
                    notificationMessage: result.message,
                    image: ""
                });
            }
        } else {
            alert("Unknown image format");
        }
        

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }

    onChangeImage(e) {
        try {
            let val = e.target.value;
            let res = val.match(/jpeg|png|jpg/g);
            if (res != null) {
                this.setState({ image: val });
            } else {
                throw 'error';
            }

        }
        catch (e) {
            console.log('error');
            console.log(this.state.image);
        }
    }

    render() {
        return (
            <>
                <Notification status={this.state.notificationStatus} message={this.state.notificationMessage} />

                <form onSubmit={this.handleAddImage}>
                    <div className="form-group">
                        <label>Изображение</label>
                        <input type="text" placeholder="Например: https://image.png" className="form-control" required onChange={this.onChangeImage} />
                        <small className="form-text text-muted">Вставьте ссылку из Интернета</small>
                    </div>
                    <button type="submit" className="btn btn-outline-success">Добавить изображение</button>
                </form>
            </>
        )
    }
}
