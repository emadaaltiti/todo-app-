import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./todo.css";
import NotificationSystem from "react-notification-system";
import SweetAlert from "react-bootstrap-sweetalert";
import { style } from '../utils/style'
import { todoAPIControllers } from './../providers/controllers/todoAPIControllers';
import Datetime from "react-datetime";
const moment = require('moment');


const initialState = {
    name: '',
    nameError: '',
    description: '',
    descriptionError: '',
    alert: null,
    id: 0,
    _notificationSystem: null,
    mode: true,
    start_date: moment(new Date()).format('YYYY-MM-DD'),
    till_date: moment(new Date()).format('YYYY-MM-DD'),
    start_dateError: '',
    start_date_is_valid: true,
    till_dateError: '',
    till_date_is_valid: true

};
let user = [];
class todoPage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.success = this.success.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state.id = this.props.match.params.id ? this.props.match.params.id : 0;
        if (this.state.id > 0) {
            this.findById(this.state.id);
        }
    }

    componentDidMount() {
        this.setState({ _notificationSystem: this.refs.notificationSystem });
    }

    findById(id) {
        new todoAPIControllers().findById(id).then(results => {
            this.state.mode = false;
            let start_date = moment(results.start_date).format('YYYY-MM-DD');
            let till_date = moment(results.till_date).format('YYYY-MM-DD');


            this.setState({
                name: results.name,
                description: results.description,
                id: results.id,
                start_date:start_date,
                till_date:till_date
            });
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
    success() {
        let mode = this.state.mode;
        if (mode === true) {
            this.handleSave();
        } else {

            this.handleUpdate();
        }

    }

    cancel() {
        this.hideAlert();
    }

    handleSave() {
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        console.log(user);
        let todo = {
            name: this.state.name,
            description: this.state.description,
            user_id: user_id,
            start_date:this.state.start_date,
            till_date:this.state.till_date

        };
        new todoAPIControllers().create(todo).then(result => {
            if (result.message) {
                this.hideAlert();
                this.state._notificationSystem.addNotification({
                    message: (
                        <div>
                            <p> {result.message}</p>
                        </div>
                    ),
                    level: "error",
                    position: "tc",
                    autoDismiss: 2,
                });
            }
            else if (result) {
                this.state.id = result.id;
                this.state.mode = false;
                this.setState({
                    alert: (
                        <SweetAlert
                            success
                            style={{ display: "block", marginTop: "-100px" }}
                            title="Saved!"
                            onConfirm={() => this.hideAlert()}
                            onCancel={() => this.hideAlert()}
                            confirmBtnBsStyle="info"
                        >
                        </SweetAlert>
                    )
                });
            }

        }).catch(err => {
            if (err) {
                this.hideAlert();
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
            }

        });

    }

    handleUpdate() {
        const user_id = JSON.parse(localStorage.getItem("user_id"));

        let todo = {
            name: this.state.name,
            description: this.state.description,
            id: this.state.id,
            user_id: user_id,
            start_date:this.state.start_date,
            till_date:this.state.till_date
        };
        new todoAPIControllers().update(todo).then(result => {
            if (result) {
                this.setState({
                    alert: (
                        <SweetAlert
                            success
                            style={{ display: "block", marginTop: "-100px" }}
                            title="Updated!"
                            onConfirm={() => this.hideAlert()}
                            onCancel={() => this.hideAlert()}
                            confirmBtnBsStyle="info"
                        >
                        </SweetAlert>
                    )
                });
            }
        }).catch(err => {

            if (err) {
                this.hideAlert();
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
            }
        });
    }


    handleAction() {
        let mode = this.state.mode;
        if (this.handleValidation()) {
            if (mode === true) {
                this.AlertSave();
            } else {
                this.AlertUpdate();
            }
        }

    }
    AlertSave() {
        this.setState({
            alert: (
                <SweetAlert
                    info
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Are you sure Want To Save?"
                    onConfirm={() => this.success()}
                    onCancel={() => this.cancel()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Yes, Save it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                </SweetAlert>
            )
        });
    }

    AlertUpdate() {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Are you sure Want To Update?"
                    onConfirm={() => this.success()}
                    onCancel={() => this.cancel()}
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Yes, Update it!"
                    cancelBtnText="Cancel"
                    showCancel
                >
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleValidation() {
        this.validation();
        if (this.state.name === "") {
            return false;
        } else if (this.state.description === '') {
            return false;
        }
        return true;
    }
    validation() {
        this.state.name === "" ? this.setState({
            nameError: (<small className="text-danger">name is required.</small>)
        }) : this.setState({ nameError: null });
        this.state.description === "" ? this.setState({
            descriptionError: (<small className="text-danger">Description is required.</small>)
        }) : this.setState({ descriptionError: null });
    }
    stardDateEvent(event){
        if (event._d) {
            let date = moment(event._d.toLocaleDateString()).format('YYYY-MM-DD');
            this.setState({start_date: date});
            this.setState({start_dateError: null});
            this.setState({start_date_is_valid: true});

        } else {
            this.setState({start_date_is_valid: false});
            this.setState({
                start_dateError: (<small className="text-danger">Invalid date The date should be
                 {this.state.start_date} </small>)
            })
        }

    }
    tillDateEvent(event){
        if (event._d) {
            let date = moment(event._d.toLocaleDateString()).format('YYYY-MM-DD');
            this.setState({till_date: date});
            this.setState({till_dateError: null});
            this.setState({till_date_is_valid: true});

        } else {
            this.setState({till_date_is_valid: false});
            this.setState({
                till_dateError: (<small className="text-danger">Invalid date The date should be
                 {this.state.till_date} </small>)
            })
        }

    }
    render() {
        return (
            <div className="todo">
                <NotificationSystem ref="notificationSystem" style={style} />
                <form>
                    {this.state.alert}


                    New Todo Form
                    <FormGroup bsSize="large">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            autoFocus
                            placeholder="Name"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => {
                                this.setState({ name: event.target.value });
                                event.target.value === "" ? this.setState({
                                    nameError: (
                                        <small className="text-danger">Name is
                                            required.</small>)
                                }) : this.setState({ nameError: null });

                            }}

                        />
                        {this.state.nameError}
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            autoFocus
                            componentClass="textarea" placeholder="Description"
                            value={this.state.description}
                            onChange={(event) => {
                                this.setState({ description: event.target.value });
                                event.target.value === "" ? this.setState({
                                    descriptionError: (
                                        <small className="text-danger">Description is
                                            required.</small>)
                                }) : this.setState({ descriptionError: null });

                            }}

                        />
                        {this.state.descriptionError}
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>
                            <b> Start Date </b><span className="star">*</span>
                        </ControlLabel>
                        <Datetime
                            closeOnSelect={true}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            inputProps={{ placeholder: "Date Picker Here" }}
                            defaultValue={this.state.start_date}
                            onChange={event => this.stardDateEvent(event)}
                            value={this.state.start_date}
                        />
                    </FormGroup>
                    {this.state.start_dateError}

                    <FormGroup>
                        <ControlLabel>
                            <b> Till Date </b><span className="star">*</span>
                        </ControlLabel>
                        <Datetime
                            closeOnSelect={true}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            inputProps={{ placeholder: "Date Picker Here" }}
                            defaultValue={this.state.till_date}
                            onChange={event => this.tillDateEvent(event)}
                            value={this.state.till_date}
                        />
                    </FormGroup>
                    {this.state.till_dateError}

                    <Button
                        onClick={() => this.handleAction()}
                        block
                        bsSize="large"

                    >
                        Submit
                        </Button>
                </form>
            </div>
        );
    }
}

export default todoPage;
