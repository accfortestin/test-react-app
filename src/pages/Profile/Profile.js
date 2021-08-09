import ProfileCard from "./ProfileCard/ProfileCard";
import styles from "./Profile.module.css"
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../../components/Preloader/Preloader";

function Profile(props) {
    if (props.profileData == null) {
        return <Preloader />
    }

    return (
        <div className={styles.wrapper}>
            <ProfileCard profileData={props.profileData} />
            <PostsContainer />
        </div>
    )
}
export default Profile;