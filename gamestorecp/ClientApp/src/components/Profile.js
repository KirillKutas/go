import React, { Component } from 'react';
import { ProfileAdmin } from './elements/profile/ProfileAdmin';
import { ProfileUser } from './elements/profile/ProfileUser';
 
export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    async getProfile() {
        const response = await fetch("/api/account/getProfile", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();
            console.log(result);
            this.setState({
                user: result
            });
        }
    }

    async componentDidMount() {
        await this.getProfile();
    }

    renderAdminOrUserPage() {
        if (this.state.user !== undefined) {
            if (this.state.user.role === "admin") {
                return <ProfileAdmin />
            }
            else {
                return <ProfileUser />
            }
        }
    }

    render() {
       
        return (
            <div className="row">
                <div className="col-md-9">
                    {this.renderAdminOrUserPage()}
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img src="https://www.pngitem.com/pimgs/m/247-2472306_admin-anonymous-person-icon-hd-png-download.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Информация</h5>
                            <p className="card-text"><b>Email: </b>{this.state.user.email}</p>
                            <p className="card-text"><b>Имя: </b>{this.state.user.firstName}</p>
                            <p className="card-text"><b>Фамилия: </b>{this.state.user.lastName}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
