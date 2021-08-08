import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { logIn } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";


class LoginComponent extends React.Component {

    onSubmit = (data) => {
        this.props.logIn(data);
        
    };

    render() {
        if (!this.props.isAuth) {
            return <Login
                    onSubmit={this.onSubmit}
                    error={this.props.error}
                />
        }
        return <Redirect to={`/profile/${this.props.userID}`} />
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userID: state.auth.id,
        error: state.auth.error
    }
  }

const LoginContainer = connect(mapStateToProps, {logIn})(LoginComponent);

export default LoginContainer;