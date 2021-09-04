import React from 'react'
import Header from './Header'
import { connect } from "react-redux"
import { logOut } from '../../redux/auth-reducer'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

type MapDispatchToPropsType = {
    logOut: () => void
}

type OwnType = {
    history: any
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnType

class HeaderComponent extends React.Component<PropsType> {

    onLogOut = () => {
        this.props.logOut();
        this.props.history.push(`/login`)
    };

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.isAuth === true && this.props.isAuth === false) {
            this.props.history.push(`/login`);
        }
    }
    
    render() {
        return <Header {...this.props} onLogOut={this.onLogOut} />;
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

const HeaderContainer = compose(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnType, AppStateType>(mapStateToProps, {logOut})
    )(HeaderComponent);

export default HeaderContainer;