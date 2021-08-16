import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { editProfileData, getProfile } from "../../redux/profileReducer";
import Settings from "./Settings";

const SettingsContainer = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (props.profileData == null) {
        props.getProfile(props.authID);
    };

    let onEditClick = () => {
        setEditMode(!editMode);
    };

    let onSubmit = async (data) => {
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

let mapStateToProps = (state) => ({
    profileData: state.profilePage.userProfileData,
    authID: state.auth.id
});

export default compose(
    withRouter,
    connect(mapStateToProps, {editProfileData, getProfile})
)(SettingsContainer);