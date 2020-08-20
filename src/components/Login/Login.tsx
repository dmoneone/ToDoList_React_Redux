import React, { useState } from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect, useSelector, useDispatch } from 'react-redux'
import { getLogin, getResetPassword, getRegister } from '../../redux/authReducer'
import { GlobalState } from '../../redux/redux_store'
import { Redirect } from 'react-router-dom'
import { createField, Input } from '../Form/Form'
import { required, maxLength } from '../../form_validation_checks/formChecks'
import c from './Login.module.scss'
import ResetReduxForm from './ResetForm/ResetFrom'
import RegisterReduxForm from './RegisterForm/RegisterForm'
import { getAuthStatus } from '../../redux/selectors/commonSelectors'
import { SubmitingDataType as Register} from './RegisterForm/RegisterForm'
import classNames from 'classnames'

const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    email: string
    password: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const LoginForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    const isFetching = useSelector((state: GlobalState) => state.authReducer.isFetching)
    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Login</h2>
            {createField<NameType>(Input,'email','text','email',[required,maxLength100])}
            {createField<NameType>(Input,'password','password','password',[required,maxLength100])}
            <button disabled={ isFetching }>Submit</button>
            {props.error && <span className={c.error}>{props.error}</span>}
            
        </form>
    )
}

const LoginReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'login'
})(LoginForm)


type Props = {

}

const LoginPage: React.FC<Props> = props => {


    const isAuth: boolean = useSelector(getAuthStatus)
    const dispatch = useDispatch()

    const [isForgottenPassword, setForgottenPassword] = useState(false)
    const [isRegisterFrom, setRegisterForm] = useState(false)

    const selected_button_cn = classNames({
        [c.active]: isForgottenPassword && !isRegisterFrom || isRegisterFrom && !isForgottenPassword
    })

    const onSubmitLogin = (data: SubmitingDataType) => {
        dispatch(getLogin(data))
    }
    const onSubmitReset = (data: any) => {
        dispatch(getResetPassword(data.email))
    }
    const onSubmitRegister = (data: Register) => {
        dispatch(getRegister(data))
        setRegisterForm(false)
    }

    if(isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div className={c.auth_wrap}>
            {
                (!isForgottenPassword && !isRegisterFrom) && <LoginReduxForm 
                    onSubmit={onSubmitLogin}
                />
            }
            {
                (isForgottenPassword && !isRegisterFrom) && <ResetReduxForm 
                    onSubmit={onSubmitReset}
                />
            }
            {
                (isRegisterFrom && !isForgottenPassword) && <RegisterReduxForm 
                    onSubmit={onSubmitRegister}
                />
            }
            
            <button 
                onClick={ () => isForgottenPassword ? setForgottenPassword(false) : setForgottenPassword(true) }
                disabled={ isRegisterFrom }
                className={selected_button_cn}
            >
                
                Did you forget password?
            </button>
            <button 
                className={selected_button_cn}
                onClick={ () => isRegisterFrom ? setRegisterForm(false) : setRegisterForm(true) }
                disabled={ isForgottenPassword }
            >
                Register
            </button>
        </div>
    )
}

export default LoginPage


