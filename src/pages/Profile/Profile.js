import ProfileCard from "./ProfileCard/ProfileCard";
import styles from "./Profile.module.css"
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../../components/Preloader/Preloader";

function Profile({profileData}) {
    if (profileData == null) {
        return <Preloader />
    }

    return (
        <div className={styles.wrapper}>
            <ProfileCard {...profileData} />
            <PostsContainer />
        </div>
    )
}
export default Profile;