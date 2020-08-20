import React from 'react'
import { maxLength, required } from "../../../form_validation_checks/formChecks"
import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, Input } from "../../Form/Form"
import c from '../Login.module.scss'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'
import { Redirect } from 'react-router-dom'
import { getAuthStatus } from '../../../redux/selectors/commonSelectors'


const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

export type SubmitingDataType = {
    email: string,
    name: string,
    password: string,
    extraPassword: string,
} 

type OwnProps = {
    
}

type NameType = Extract<keyof SubmitingDataType,string>

const RegisterForm: React.FC<InjectedFormProps<SubmitingDataType, OwnProps> & OwnProps> = (props) => {
     
    const newUserMsg = useSelector((state: GlobalState) => state.authReducer.newUserMsg)
    const isFetching = useSelector((state: GlobalState) => state.authReducer.isFetching)

    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Register</h2>
            {createField<NameType>(Input,'email','text','email',[required,maxLength100])}
            {createField<NameType>(Input,'name','text','name',[required,maxLength100])}
            {createField<NameType>(Input,'password','password','password',[required,maxLength100])}
            {createField<NameType>(Input,'extraPassword','password','extraPassword',[required,maxLength100])}
            <button disabled={ isFetching } >submit</button>
            <span>{ newUserMsg ? newUserMsg : 'in processing' }</span>
            {props.error && <span className={c.error}>{props.error}</span>}
        </form>
    )
}

const RegisterReduxForm = reduxForm<SubmitingDataType, OwnProps>({
    form: 'register'
})(RegisterForm)

export default RegisterReduxForm