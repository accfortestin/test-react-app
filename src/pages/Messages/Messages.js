import React from "react"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import styles from "./Messages.module.css"
import { useForm } from 'react-hook-form';

let Messages = (props) => {
    const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
    return (
        <div className={styles.wrapper}>
            <h2>Dialogs</h2>
            <div className={styles.dialogs}>
                {props.dialogData.map((arr) => {
                    return <Dialog key={arr.id} id={arr.id} name={arr.name} />
                })}
            </div>
            <div className={styles.messages}>
                {props.messageData.map((arr) => {
                    return <Message key={arr.id} name={arr.author} message={arr.message} />
                })}
                <form onSubmit={handleSubmit((data) => props.onSendMessage(data))}>
                    <textarea className={styles.messagesInput} rows="2" placeholder="Enter your message..." {...register('newMessageText')}></textarea>
                    <button className={styles.sendButton}>Send</button>
                </form>
            </div>
        </div>
    )

}

export default Messages;