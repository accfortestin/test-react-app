import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { logIn, LogInDataType } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    userID: number
    error: string | null
    captchaURL: string | null
}

type MapDispatchToPropsType = {
    logIn: (logInData: LogInDataType) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class LoginComponent extends React.Component<PropsType> {

    onSubmit = (data: LogInDataType) => {
        this.props.logIn(data);
        
    };

    render() {
        if (!this.props.isAuth) {
            return <Login
                    onSubmit={this.onSubmit}
                    error={this.props.error}
                    captchaURL={this.props.captchaURL}
                />
        }
        return <Redirect to={`/profile/${this.props.userID}`} />
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        userID: state.auth.id,
        error: state.auth.error,
        captchaURL: state.auth.captchaURL
    }
  }

const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {logIn})(LoginComponent);

export default LoginContainer;