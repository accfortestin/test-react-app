import React from 'react'
import Header from './Header'
import { connect } from "react-redux"
import { logOut } from '../../redux/auth-reducer'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


class HeaderComponent extends React.Component {

    onLogOut = () => {
        this.props.logOut();
        this.props.history.push(`/login`)
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isAuth === true && this.props.isAuth === false) {
            this.props.history.push(`/login`);
        }
    }
    
    render() {
        return <Header {...this.props} onLogOut={this.onLogOut} />;
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

const HeaderContainer = compose(
    withRouter,
    connect(mapStateToProps, {logOut})
    )(HeaderComponent);

export default HeaderContainer;