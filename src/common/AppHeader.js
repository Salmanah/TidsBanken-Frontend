import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';


class AppHeader extends Component {
    
    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">Spring Social</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            {console.log("INSIDE APP HEADER ",this.props.authenticated)}
                                { this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <NavLink to="/profile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/ViewVacationRequest">ViewVacationRequest</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/ViewRequestHistory">ViewRequestHistory</NavLink>
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>        
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>        
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;