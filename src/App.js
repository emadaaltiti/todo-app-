import React from "react";
import { Route, Redirect } from "react-router-dom";
import homePage from "./components/home";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/register";
import todoPage from "./components/todo";

const authed = parseBolean(sessionStorage.getItem("authed")) ? parseBolean(sessionStorage.getItem("authed")) : false;
function PrivateRoute({ component: Component, authed, ...rest }) {
    console.log(authed);

    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}
const App = () => (

    <div>
        <Route path="/" exact component={LoginPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/todoEdit/:id" exact component={todoPage} />
        <PrivateRoute authed={authed} path='/home' component={homePage}>  </PrivateRoute>
        <PrivateRoute authed={authed} path='/todo' component={todoPage}>
        </PrivateRoute>

    </div>
);
function parseBolean(type) {
    return typeof type == 'string' ? JSON.parse(type) : type;
}
export default App;
