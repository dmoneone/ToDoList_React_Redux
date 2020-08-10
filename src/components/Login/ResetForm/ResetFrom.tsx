import React from 'react'
import { maxLength, required } from "../../../form_validation_checks/formChecks"
import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, Input } from "../../Form/Form"
import c from '../Login.module.css'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../../redux/redux_store'

const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    email: string
}


type NameType = Extract<keyof SubmitingDataType,string>

const ResetForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {

    const resetMsg = useSelector((state: GlobalState) => state.authReducer.resetMsg)

    return (
        <form onSubmit={props.handleSubmit}>
            <h2>Reset</h2>
            {createField<NameType>(Input,'email','text','email',[required,maxLength100])}
            <button>Reset</button>
            {props.error && <span className={c.error}>{props.error}</span>}
            <span>{resetMsg ? resetMsg : 'reset'}</span>
        </form>
    )
}

const ResetReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'reset'
})(ResetForm)

export default ResetReduxForm