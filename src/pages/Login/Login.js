import { useForm } from 'react-hook-form';
import styles from './Login.module.css'



let Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    return (
        <div className={styles.wraapper}>
            <h1 className={styles.heading}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit((data) => props.onSubmit(data))}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='email' className={styles.label} >Login</label>
                    <input id='email' className={styles.input} {...register('email', { required: true })} />
                    {errors.email && <span className={styles.error}>The field is required</span>}
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='password' className={styles.label} >Password</label>
                    <input id='password' type='password' className={styles.input} {...register('password', { required: true, minLength: 6 })} />
                    {errors.password && <span className={styles.error}>The password should contain at least 6 symbols</span>}
                </div>
                <div className={styles.inputWrapper + ' ' + styles.rememberMe}>
                    <input id='rememberMe' className={styles.checkbox} {...register('rememberMe')} type='checkbox' />
                    <label htmlFor='rememberMe' className={styles.label +  ' ' + styles.rememberMe} >remember me</label>
                </div>
                {props.error && <div className={styles.error}>{props.error}</div>}
                {errors.password || errors.email ? <button className={styles.submitButton} disabled >Submit</button> : <button className={styles.submitButton} >Submit</button>}
                
            </form>
        </div>
    )
}

export default Login;