import Post from "./Post/Post"
import styles from "./Posts.module.css"
import { useForm } from 'react-hook-form';
import { PostDataType } from "../../../redux/profileReducer";

type PropsType = {
  onPostSend: (data: any) => void
  postData: Array<PostDataType>
}

let Posts: React.FC<PropsType> = ({onPostSend, postData}) => {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>My Posts</h2>
      <form onSubmit={handleSubmit((data) => onPostSend(data))}>
        <textarea className={styles.input} rows={3} placeholder="your news..." {...register('newPostText')} />
        <button className={styles.button}>Send</button>
      </form>
      <div className={styles.container}>
        {postData.map((arr) => {
          return <Post key={arr.id} message={arr.message} likeCounter={arr.likeCounter} />
        })}
      </div>
    </div>
  )
}

export default Posts;