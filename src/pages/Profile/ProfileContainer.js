import React from 'react'
import { connect } from "react-redux"
import Profile from './Profile'
import { getProfile, uploadMainPhoto } from '../../redux/profileReducer'
import { authUserIDGetter } from '../../redux/state-selectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

class ProfileComponent extends React.Component {

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

    onUploadingMainPhoto = (e) => {
        if (e.target.files.length) {
            this.props.uploadMainPhoto(e.target.files[0]);
        }  
    }
    
    render() {
        return <Profile
            {...this.props}
            currentProfileUserID={this.state.userID}
            onUploadingMainPhoto={this.onUploadingMainPhoto}
        />
    }

}

let mapStateToProps = (state) => ({
    profileData: state.profilePage.userProfileData,
    isAuth: state.auth.isAuth,
    authUserID: authUserIDGetter(state)    
});

export default compose(
    withRouter,
    connect(mapStateToProps, {getProfile, uploadMainPhoto})
)(ProfileComponent);