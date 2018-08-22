import React, {Component} from "react";
import {
    Navbar,
    Header,
    NavItem,
    Button,
    Nav,
    Well,
    Checkbox,
    Panel,
    ListGroup,
    ButtonToolbar,
    ListGroupItem,
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    Table
} from 'react-bootstrap'
import {BrowserRouter} from 'react-router-dom';
import TodoControllers from "../providers/controllers/todoAPIControllers";


import './home.css';

const initialState = {
    todoList: [],
    name: '',
    nameError: '',
    alert: null,
    mode: true,
    complete: false,
};
let tasks = [
    {id: 1, title: 'To do 1', description: 'asdasdasdsa', finished: false, bsStyle: 'info'},
    {id: 1, title: 'tasTo do 2ks', description: 'asdasdasdsa', finished: false, bsStyle: 'info'},
    {id: 1, title: 'Tod do 3', description: 'asdasdasdsa', finished: false, bsStyle: 'info'},
    {id: 1, title: 'to do 4', description: 'asdasdasdsa', finished: false, bsStyle: 'info'},
    {id: 1, title: 'todo 6', description: 'asdasdasdsa', finished: false, bstySle: 'info'},
]
const moment = require('moment');


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

    }

    componentDidMount() {
        let user_id = sessionStorage.getItem("user_id");

        this.findAll(user_id);

    }

    findAll(user_id) {
        new TodoControllers().findAllByUserId(user_id).then(todo => {
            if (todo) {
                this.setState({todoList: this.setTodo(todo)});
            }


        }).catch(err => {

        });
    }

    setTodo(list) {
        let oldList = list;
        let newList = [];
        oldList.map(items => {
            let start_date = moment(items.start_date).format('YYYY-MM-DD');
            let till_date = moment(items.till_date).format('YYYY-MM-DD');
            let item = {
                id: items.id,
                name: items.name,
                description: items.description,
                user_id: items.user_id,
                complete: items.complete,
                start_date: start_date,
                till_date: till_date,
                bsStyle: 'info'

            };
            newList.push(item);
        });
        console.log(newList);
        return newList;

    }

    handleLogout() {
        sessionStorage.clear();
        window.location.reload();
    }

    handleChangeCheckBox(item) {
        item.complete = !item.complete;
        this.handleComplate(item);
    }

    handleComplate(item) {
        let data = {
            id: item.id,
            complete: item.complete
        }
        new TodoControllers().updatecComplete(data).then(todo => {
            let user_id = sessionStorage.getItem("user_id");
            this.findAll(user_id);

        }).catch(err => {

        });

    }

    handleRouteTOdo() {
        this.props.history.push("/todo");

    }


    handleDelete(id) {
        new TodoControllers().delete(id).then(todo => {
            let user_id = sessionStorage.getItem("user_id");
            this.findAll(user_id);

        }).catch(err => {

        });
    }

    handleUpdate(id) {
        this.props.history.push("/todoEdit/" + id);

    }

    render() {
        let tasksDOM = this.state.todoList.map(function (item) {
            return <div key={item.id}>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <ListGroupItem bsStyle={item.bsStyle}>
                            <div>
                                Ttile :{item.name}
                            </div>
                            <br/>Description:{item.description}<br/>
                        </ListGroupItem>
                        Start Date {item.start_date} Till Date {item.till_date}
                    </Col>
                    <Col xs={6} md={4}>
                        <ButtonToolbar>
                            <div className="container">
                                <Checkbox
                                    checked={item.complete}
                                    onChange={(el, state) => {
                                        this.handleChangeCheckBox(item);
                                        this.setState({complete: item.complete})
                                    }}>
                                    <span className="checkmark"></span>
                                </Checkbox>
                            </div>
                            &nbsp;&nbsp;
                            <Button bsStyle="warning"
                                    onClick={() => this.handleUpdate(item.id)}>Update</Button>  &nbsp;&nbsp;
                            <Button bsStyle="danger" onClick={() => this.handleDelete(item.id)}>Delete</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                &nbsp;&nbsp;
            </div>

        }.bind(this));
        return (
            <div className="main-content">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Todo</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem onClick={() => this.handleLogout()} eventKey={1}>
                            Logout
                        </NavItem>
                    </Nav>
                </Navbar>


                <Grid fluid>

                    <div>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3"> <Button bsStyle="primary"
                                                                          onClick={() => this.handleRouteTOdo()}>New
                                    Todo</Button>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <ListGroup>
                                    {tasksDOM}
                                </ListGroup>
                            </Panel.Body>
                        </Panel>
                    </div>
                </Grid>
            </div>

        );
    }
}

export default HomePage;
