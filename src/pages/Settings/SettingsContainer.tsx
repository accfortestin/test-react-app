import { UserProfileDataType } from '../../redux/profileReducer';
import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { editProfileData, getProfile } from "../../redux/profileReducer";
import Settings from "./Settings";
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    profileData: UserProfileDataType | null
    authID: number | null
}

type MapDispatchToPropsType = {
    editProfileData: (newData: any) => void
    getProfile: (userID: number | null) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const  SettingsContainer = (props: PropsType) => {
    let [editMode, setEditMode] = useState(false);

    if (props.profileData == null) {
        props.getProfile(props.authID);
    };

    let onEditClick = () => {
        setEditMode(!editMode);
    };

    let onSubmit = async (data: any) => {
        await props.editProfileData(data)
        setEditMode(false);
    };

    return <Settings
        onSubmit={onSubmit}
        editMode={editMode}
        onEditClick={onEditClick}
        profileData={props.profileData}
    />
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profileData: state.profilePage.userProfileData,
    authID: state.auth.id
});

export default compose(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {editProfileData, getProfile})
)(SettingsContainer);