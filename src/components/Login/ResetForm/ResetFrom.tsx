import React from 'react'
import { maxLength, required } from "../../../form_validation_checks/formChecks"
import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, Input } from "../../Form/Form"
import c from '../Login.module.css'
import { Redirect } from 'react-router-dom'

const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    email: string
}

type OwnProps = {
    resetMsg: string | null
}

type NameType = Extract<keyof SubmitingDataType,string>

const ResetForm: React.FC<InjectedFormProps<SubmitingDataType, OwnProps> & OwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'email','text','email',[required,maxLength100])}
            <button>Reset</button>
            {props.error && <span className={c.error}>{props.error}</span>}
            <span>{props.resetMsg ? props.resetMsg : 'reset'}</span>
        </form>
    )
}

const LoginReduxForm = reduxForm<SubmitingDataType, OwnProps>({
    form: 'reset'
})(ResetForm)

export default LoginReduxForm