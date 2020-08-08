import React, { useState } from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { getLogin, getResetPassword } from '../../redux/authReducer'
import { GlobalState } from '../../redux/redux_store'
import { Redirect } from 'react-router-dom'
import { createField, Input } from '../Form/Form'
import { required, maxLength } from '../../form_validation_checks/formChecks'
import c from './Login.module.css'
import ResetForm from './ResetForm/ResetFrom'

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

type mapDispatch = {
    getLogin: (data: SubmitingDataType) => void
    getResetPassword: (email: string) => void
}

type MapState = {
    isAuth: boolean,
    resetMsg: string | null
}

type Props = mapDispatch & MapState

const LoginPage: React.FC<Props> = props => {

    const [isForgottenPassword, setForgottenPassword] = useState(false)

    const onSubmitLogin = (data: SubmitingDataType) => {
        props.getLogin(data)
    }

    const onSubmitReset = (data: any) => {
        props.getResetPassword(data.email)
    }

    if(props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
            <h1>Login</h1>
            {
                !isForgottenPassword && <LoginReduxForm 
                    onSubmit={onSubmitLogin}
                />
            }
            {
                isForgottenPassword && <ResetForm 
                    onSubmit={onSubmitReset}
                    resetMsg={props.resetMsg}
                />
            }
            <button 
                onClick={ () => isForgottenPassword ? setForgottenPassword(false) : setForgottenPassword(true) }>
                Did you forget password?
            </button>
        </div>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    isAuth: state.authReducer.isAuth,
    resetMsg: state.authReducer.resetMsg 
})

export default connect<MapState, mapDispatch, {}, GlobalState>(mapStateToProps, {getLogin, getResetPassword})(LoginPage)
