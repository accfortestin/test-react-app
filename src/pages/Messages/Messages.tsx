import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message"
import styles from "./Messages.module.css"
import { useForm } from 'react-hook-form'
import { DialogDataType, MessageDataType } from "../../redux/messagesReducer"

type PropsType = {
    dialogData: Array<DialogDataType>
    messageData: Array<MessageDataType>
    onSendMessage: (data: any) => void
}

let Messages: React.FC<PropsType> = ({dialogData, messageData, onSendMessage}) => {
    const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
    return (
        <div className={styles.wrapper}>
            <h2>Dialogs</h2>
            <div className={styles.dialogs}>
                {dialogData.map((arr) => {
                    return <Dialog key={arr.id} id={arr.id} name={arr.name} />
                })}
            </div>
            <div className={styles.messages}>
                {messageData.map((arr) => {
                    return <Message key={arr.id} name={arr.author} message={arr.message} />
                })}
                <form onSubmit={handleSubmit((data) => onSendMessage(data))}>
                    <textarea className={styles.messagesInput} rows={2} placeholder="Enter your message..." {...register('newMessageText')}></textarea>
                    <button className={styles.sendButton}>Send</button>
                </form>
            </div>
        </div>
    )

}

export default Messages;