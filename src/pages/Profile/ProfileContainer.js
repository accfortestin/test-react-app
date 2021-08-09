import React from 'react'
import { connect } from "react-redux"
import Profile from './Profile'
import { getProfile } from '../../redux/profileReducer'
import { authUserIDGetter } from '../../redux/state-selectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

class ProfileComponent extends React.Component {

    // let [userID] = useState(props.match.params.userID);

    state = ({
        userID: this.props.match.params.userID
    })

    componentDidMount() {

        if (!this.state.userID && this.props.isAuth) {
            this.props.history.push(`/profile/${this.props.authUserID}`)
            this.props.getProfile(this.props.authUserID);
        };
        this.props.getProfile(this.state.userID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userID !== this.props.match.params.userID) {
            this.props.getProfile(this.props.match.params.userID);
        }
    }

    render() { return <Profile {...this.props}/> }

}

let mapStateToProps = (state) => ({
    profileData: state.profilePage.userProfileData,
    isAuth: state.auth.isAuth,
    authUserID: authUserIDGetter(state)
});

export default compose(
    withRouter,
    connect(mapStateToProps, {getProfile})
)(ProfileComponent);