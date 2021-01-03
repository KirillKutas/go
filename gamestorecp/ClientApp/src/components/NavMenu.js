import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthorize: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    async componentDidMount() {
        await this.isAuthorize();
    }

    async isAuthorize() {
        const response = await fetch("/api/account/isAuthorize", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok === true) {
            let result = await response.json();

            this.setState({
                isAuthorize: result.isAuth
            });
        }
    }

    async logout() {
        const response = await fetch("/api/account/logout", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        setTimeout(function () {
            window.location.reload();
            return false;
        }, 500);
    }

    renderNavItemLoginOrLogout() {
        if (this.state.isAuthorize === true) {
            return (
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/Profile">Профиль</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark btn btn-outline-dark" onClick={this.logout} to="/">Выйти</NavLink>
                    </NavItem>
                </>
            );
        }

        return (
            <>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/Login">Войти</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark btn btn-outline-dark" to="/Registration">Регистрация</NavLink>
                </NavItem>
            </>
        );
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">gamestore</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                {
                                    this.renderNavItemLoginOrLogout()
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
