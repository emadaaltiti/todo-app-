import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./login.css";
import NotificationSystem from "react-notification-system";
import usersController from "../providers/controllers/usersAPIControllers";

import {style} from '../utils/style'

const initialState = {
    password: '',
    email: '',
    passwordError: '',
    emailError: '',
    alert: null,
    _notificationSystem: null,
    mode: true
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

    }

    componentDidMount() {
        this.setState({_notificationSystem: this.refs.notificationSystem});


    }

    handleSignUp() {
        this.props.history.push("/register/");

    }

    handleAction() {
        let object = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(object);
        new usersController().login(object).then(user => {
            if (user.message) {
                this.state._notificationSystem.addNotification({
                    message: (
                        <div>
                            <p> {user.message}</p>
                        </div>
                    ),
                    level: "error",
                    position: "tc",
                    autoDismiss: 2,
                });
            }
            else if (user) {
                window.sessionStorage.setItem("authed", true);
                window.sessionStorage.setItem("user", JSON.stringify(user));
                window.sessionStorage.setItem("user_id", JSON.stringify(user[0].id));
                this.props.history.push("/home");
                window.location.reload();

            }
        }).catch(err => {
            // this.state._notificationSystem.addNotification({
            //     message: (
            //         <div>
            //             <p> {err}</p>
            //         </div>
            //     ),
            //     level: "error",
            //     position: "tc",
            //     autoDismiss: 2,
            // });
        });
    }

    handleValidation() {
        this.validation();
        if (this.state.email === "") {
            return false;
        }
        else if (this.state.password === "") {
            return false;
        } else if (!this.validateEmail(this.state.email)) {
            this.setState({
                emailError: (<small className="text-danger">email Not Valid.</small>)
            });
            return false;
        }
        return true;
    }

    validation() {
        this.state.email === "" ? this.setState({
            emailError: (<small className="text-danger">email is required.</small>)
        }) : this.setState({emailError: null});

        this.state.password === "" ? this.setState({
            passwordError: (<small className="text-danger">Password is required.</small>)
        }) : this.setState({passwordError: null});
    }

    validateEmail(value) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    render() {
        return (
            <div className="Login">
                <NotificationSystem ref="notificationSystem" style={style}/>


                <form>
                    <FormGroup bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({email: event.target.value});
                                event.target.value === "" ? this.setState({
                                    emailError: (
                                        <small className="text-danger">Email is
                                            required.</small>)
                                }) : this.setState({emailError: null});

                            }}

                        />
                        {this.state.emailError}
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            type="password"
                            onChange={(event) => {
                                this.setState({password: event.target.value});
                                event.target.value === "" ? this.setState({
                                    passwordError: (
                                        <small className="text-danger">Password is
                                            required.</small>)
                                }) : this.setState({passwordError: null});

                            }}
                        />
                        {this.state.passwordError}
                    </FormGroup>
                    <Button
                        onClick={() => this.handleAction()}
                        block
                        bsSize="large"

                    >
                        Login
                    </Button>


                    <p onClick={() => this.handleSignUp()}>Create Account</p>
                </form>
            </div>
        );
    }
}

export default LoginPage;
