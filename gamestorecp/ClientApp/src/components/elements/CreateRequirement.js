import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from './../elements/Notification'

export class CreateRequirement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            os: "",
            processor: "",
            ram: 0,
            videoCard: "",
            freeHardDiskSpace: 0,
            notificationStatus: false,
            notificationMessage: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeOS = this.onChangeOS.bind(this);
        this.onChangeProcessor = this.onChangeProcessor.bind(this);
        this.onChangeRam = this.onChangeRam.bind(this);
        this.onChangeVideoCard = this.onChangeVideoCard.bind(this);
        this.onChangeFreeHardDiskSpace = this.onChangeFreeHardDiskSpace.bind(this);
    }

    onChangeOS(e) {
        let val = e.target.value;
        this.setState({ os: val });
    }

    onChangeProcessor(e) {
        let val = e.target.value;
        this.setState({ processor: val });
    }

    onChangeRam(e) {
        let val = e.target.value;
        this.setState({ ram: val });
    }

    onChangeVideoCard(e) {
        let val = e.target.value;
        this.setState({ videoCard: val });
    }

    onChangeFreeHardDiskSpace(e) {
        let val = e.target.value;
        this.setState({ freeHardDiskSpace: val });
    }


    async handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("api/Requirement/create", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                os: this.state.os,
                processor: this.state.processor,
                ram: this.state.ram,
                videoCard: this.state.videoCard,
                freeHardDiskSpace: parseInt(this.state.freeHardDiskSpace),
                productId: parseInt(this.props.data)
            })
        });

        let result = await response.json();

        this.setState({
            notificationStatus: response.ok,
            notificationMessage: result.message
        });

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
                        <label htmlFor="name">Операционная система: </label>
                        <input required maxlength="100" type="text" placeholder="Например: Windows 10" className="form-control" onChange={this.onChangeOS} id="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Процессор: </label>
                        <input required maxlength="100" type="text" placeholder="Например: Intel Core i5" className="form-control" onChange={this.onChangeProcessor} id="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Оперативная память: </label>
                        <input required  type="number" min="1" max="50" placeholder="Например: 4 Гб" className="form-control" onChange={this.onChangeRam} id="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Видео карта: </label>
                        <input required maxlength="100" type="text" placeholder="Например: NVIDIA Geforce RTX 2030" className="form-control" onChange={this.onChangeVideoCard} id="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Свободное место на диске: </label>
                        <input required type="number" min="1" max="100" placeholder="Например: 4 Гб" className="form-control" onChange={this.onChangeFreeHardDiskSpace} id="name" required />
                    </div>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </form>
            </>
        );
    }
}
