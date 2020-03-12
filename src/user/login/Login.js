import React, {Component} from 'react'; 
import {Redirect} from 'react-router-dom';
import {GOOGLE_AUTH_URL, ACCESS_TOKEN} from '../../constants';
import {login} from '../../utils/APIUtils';
import Alert from 'react-s-alert';


class Login extends Component{
    componentDidMount(){
        console.log("LOGIN COMPONENT",this.props.location.pathname)
        console.log("AUTHENTICATED", this.props.authenticated); 
        if(this.props.location.state && this.props.location.state.error){
            setTimeout(() =>{
                Alert.error(this.props.location.state.error,{
                    timeout:5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname, 
                    state: {}
                });
            }, 100);
        }
    }

    render(){
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-constent">
                    <h1 className="login-title">Login to our App</h1>
                    <GoogleLogin/>
                </div>
            </div>
        )
    }
}



class GoogleLogin extends Component{
    render(){
        return(
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <p>Log in with GOOGLE</p>
                </a>
            </div>
        ); 
    }

    handleSubmit(event) {
        event.preventDefault();   

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("You're successfully logged in!");
            this.props.history.push("/");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
}


export default Login; 