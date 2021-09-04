import React from 'react'
import { connect } from "react-redux"
import Profile from './Profile'
import { getProfile, uploadMainPhoto, UserProfileDataType } from '../../redux/profileReducer'
import { authUserIDGetter } from '../../redux/state-selectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'

type MapStateToPropsType = {
    profileData: UserProfileDataType
    isAuth: boolean
    authUserID: number | null  
}

type MapDispatchToPropsType = {
    getProfile: (userID: number | null) => void
    uploadMainPhoto: (photo: any) => void
}

type OwnPropsType = {
    match: any
    history: any
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

type StateType = {
    userID: number
}

class ProfileComponent extends React.Component<PropsType> {

    state: StateType = ({
        userID: this.props.match.params.userID
    })

    componentDidMount() {

        if (!this.state.userID && this.props.isAuth) {
            this.props.history.push(`/profile/${this.props.authUserID}`)
            this.props.getProfile(this.props.authUserID);
        };
        this.props.getProfile(this.state.userID);
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userID !== this.props.match.params.userID) {
            this.props.getProfile(this.props.match.params.userID);
        }
    }

    onUploadingMainPhoto = (e: any) => {
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profileData: state.profilePage.userProfileData,
    isAuth: state.auth.isAuth,
    authUserID: authUserIDGetter(state)    
});

export default compose(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getProfile, uploadMainPhoto})
)(ProfileComponent);