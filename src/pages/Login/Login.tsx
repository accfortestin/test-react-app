import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { LogInDataType } from '../../redux/auth-reducer';
import styles from './Login.module.css'

type PropsType = {
    onSubmit: (data: LogInDataType) => void
    error: string | null
    captchaURL: string | null
}

let Login: FC<PropsType> = ({onSubmit, error, captchaURL}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    return (
        <div className={styles.wraapper}>
            <h1 className={styles.heading}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit((data: LogInDataType) => onSubmit(data))}>
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
                {captchaURL && 
                    <>
                    <div className={styles.captcha}><img src={captchaURL} alt="" /></div>
                    <input id='captcha' className={styles.input} {...register('captcha', { required: true })} />
                    </>
                }
                {error && <div className={styles.error}>{error}</div>}
                {errors.password || errors.email ? <button className={styles.submitButton} disabled >Submit</button> : <button className={styles.submitButton} >Submit</button>}
                
            </form>
        </div>
    )
}

export default Login;