import React, { Component } from "react";
import {
    Button, Row, Col,
    Media,
    FormControl, FormGroup
} from "react-bootstrap";
import "./login.css";
import NotificationSystem from "react-notification-system";
import usersController from "../providers/controllers/usersAPIControllers";
import { style } from '../utils/style'
const initialState = {
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    password: '',
    email: '',
    passwordError: '',
    emailError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    alert: null,
    _notificationSystem: null,
    mode: true
};
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

    }

    componentDidMount() {
        this.setState({ _notificationSystem: this.refs.notificationSystem });


    }
    handleValidation() {
        this.validation();
        if (this.state.firstName === "") {
            return false;
        }
        else if (this.state.lastName === "") {
            return false;
        }
        else if (this.state.email === "") {
            return false;
        }
        else if (this.state.password === "") {
            return false;
        } else if (this.state.confirmPassword === "") {
            return false;
        } else if (!this.validateEmail(this.state.email)) {
            this.setState({
                emailError: (<small className="text-danger">email Not Valid.</small>)
            });
            return false;
        } else if (this.state.password != this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: (<small className="text-danger">Your password and confirmation password do not match .</small>)
            });
            return false;
        }
        return true;
    }
    validation() {
        this.state.email === "" ? this.setState({
            emailError: (<small className="text-danger">email is required.</small>)
        }) : this.setState({ emailError: null });

        this.state.password === "" ? this.setState({
            passwordError: (<small className="text-danger">Password is required.</small>)
        }) : this.setState({ passwordError: null });
        this.state.firstName === "" ? this.setState({
            firstNameError: (<small className="text-danger">First  Name required.</small>)
        }) : this.setState({ firstNameError: null });
        this.state.lastName === "" ? this.setState({
            lastNameError: (<small className="text-danger">Last  Name required.</small>)
        }) : this.setState({ lastNameError: null });
        this.state.confirmPassword === "" ? this.setState({
            confirmPasswordError: (<small className="text-danger">Confirm Password required.</small>)
        }) : this.setState({ confirmPasswordError: null });
    }
    validateEmail(value) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    handleAction() {
        if (this.handleValidation()) {
            this.handleCreate();
        }


    }

    handleCreate() {
        let object = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.confirmPassword
        }
        new usersController().create(object).then(user => {
        this.props.history.push("/login/");
        }).catch(err => {
            this.state._notificationSystem.addNotification({
                message: (
                    <div>
                        <p> {err}</p>
                    </div>
                ),
                level: "error",
                position: "tc",
                autoDismiss: 2,
            });
        });

    }


    render() {
        return (
            <div className="Login">
                <NotificationSystem ref="notificationSystem" style={style} />
               
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <div className="header-text">
                                <h2>Todo</h2>
                                <h4>Register for free</h4>
                                <hr />
                            </div>
                        </Col>
                        <Col md={4}>
                            <form>
                            <div>
                                    <FormGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Your First Name"
                                            value={this.state.firstName}
                                            onChange={(event) => {
                                                this.setState({ firstName: event.target.value });
                                                event.target.value === "" ? this.setState({
                                                    firstNameError: (
                                                        <small className="text-danger">First Name is
                                                                required.</small>)
                                                }) : this.setState({ firstNameError: null });

                                            }}

                                        />
                                        {this.state.firstNameError}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Your Last Name"
                                            value={this.state.lastName}
                                            onChange={(event) => {
                                                this.setState({ lastName: event.target.value });
                                                event.target.value === "" ? this.setState({
                                                    lastNameError: (
                                                        <small className="text-danger">Last Name is
                                                                required.</small>)
                                                }) : this.setState({ lastNameError: null });

                                            }}

                                        />
                                        {this.state.lastNameError}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            placeholder="Enter Email"
                                            type="email"
                                            value={this.state.email}
                                            onChange={(event) => {
                                                this.setState({ email: event.target.value });
                                                event.target.value === "" ? this.setState({
                                                    emailError: (
                                                        <small className="text-danger">Email is
                                                                required.</small>)
                                                }) : this.setState({ emailError: null });

                                            }}

                                        />
                                        {this.state.emailError}

                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                            type="password"
                                            onChange={(event) => {
                                                this.setState({ password: event.target.value });
                                                event.target.value === "" ? this.setState({
                                                    passwordError: (
                                                        <small className="text-danger">Password is
                                                            required.</small>)
                                                }) : this.setState({ passwordError: null });

                                            }}
                                        />
                                        {this.state.passwordError}

                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            type="password"
                                            placeholder="Password Confirmation"
                                            value={this.state.confirmPassword}
                                            onChange={(event) => {
                                                this.setState({ confirmPassword: event.target.value });
                                                event.target.value === "" ? this.setState({
                                                    confirmPasswordError: (
                                                        <small className="text-danger"> Confirm Password is
                                                            required.</small>)
                                                }) : this.setState({ confirmPasswordError: null });

                                            }}
                                        />
                                        {this.state.confirmPasswordError}
                                    </FormGroup>
                                </div>
                                <Button onClick={() => this.handleAction()}
                                    fill >
                                    Create Free Account
                                    </Button>
                            </form>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default RegisterPage;
