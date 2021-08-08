import React from "react";
import Post from "./Post/Post"
import styles from "./Posts.module.css"
import { useForm } from 'react-hook-form';

let Posts = (props) => {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>My Posts</h2>
      <form onSubmit={handleSubmit((data) => props.onPostSend(data))}>
        <textarea className={styles.input} rows="3" placeholder="your news..." {...register('newPostText')} />
        <button className={styles.button}>Send</button>
      </form>
      <div className={styles.container}>
        {props.postData.map((arr) => {
          return <Post key={arr.id} message={arr.message} likeCounter={arr.likeCounter} />
        })}
      </div>
    </div>
  )
}

export default Posts;