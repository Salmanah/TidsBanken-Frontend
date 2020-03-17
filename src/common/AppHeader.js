import React, { Component } from 'react';
import { Link, NavLink, Router } from 'react-router-dom';
import './AppHeader.css';
import ApplicationFrame from '../components/application-frame/index';


class AppHeader extends Component {
    
    render() {

        console.log("this.props i appheader:")
        console.log(this.props)

        return (
            <header className="app-header">
                <div className="container">
                    {/*<div className="app-branding">
                        <Link to="/" className="app-title">Spring Social</Link>
        </div>*/}
                    <div className="app-options">
                        <nav className="app-nav">
                            {console.log("INSIDE APP HEADER ",this.props.authenticated)}
                                { this.props.authenticated ? (
                                    <div>
                                        <ApplicationFrame parentProps={this.props}/>
                                    </div>
                                    ):(
                                        <div>
                                            
                                        </div>

                                    ) }
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;