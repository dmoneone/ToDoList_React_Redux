import React, { useState } from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect, useSelector, useDispatch } from 'react-redux'
import { getLogin, getResetPassword, getRegister } from '../../redux/authReducer'
import { GlobalState } from '../../redux/redux_store'
import { Redirect } from 'react-router-dom'
import { createField, Input } from '../Form/Form'
import { required, maxLength } from '../../form_validation_checks/formChecks'
import c from './Login.module.css'
import ResetReduxForm from './ResetForm/ResetFrom'
import RegisterReduxForm from './RegisterForm/RegisterForm'
import { getAuthStatus } from '../../redux/selectors/commonSelectors'
import { SubmitingDataType as Register} from './RegisterForm/RegisterForm'

const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    email: string
    password: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const LoginForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Login</h2>
            {createField<NameType>(Input,'email','text','email',[required,maxLength100])}
            {createField<NameType>(Input,'password','password','password',[required,maxLength100])}
            <button>Submit</button>
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

    const onSubmitLogin = (data: SubmitingDataType) => {
        dispatch(getLogin(data))
    }
    const onSubmitReset = (data: any) => {
        dispatch(getResetPassword(data.email))
    }
    const onSubmitRegister = async (data: Register) => {
        await dispatch(getRegister(data))
        setRegisterForm(false)
        debugger
    }

    if(isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
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
                onClick={ () => isForgottenPassword ? setForgottenPassword(false) : setForgottenPassword(true) }>
                Did you forget password?
            </button>
            <button 
                onClick={ () => isRegisterFrom ? setRegisterForm(false) : setRegisterForm(true) }>
                Register
            </button>
        </div>
    )
}

export default LoginPage


