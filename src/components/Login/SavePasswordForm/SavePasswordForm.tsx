import React from 'react'
import { maxLength, required } from "../../../form_validation_checks/formChecks"
import { InjectedFormProps, reduxForm } from "redux-form"
import { createField, Input } from "../../Form/Form"
import c from '../Login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { savePassword } from '../../../redux/authReducer'
import { GlobalState } from '../../../redux/redux_store'

const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    password: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const SavePasswordForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {

    const resetMsg = useSelector((state: GlobalState) => state.authReducer.successfullResetMsg)
    const isFetching = useSelector((state: GlobalState) => state.authReducer.isFetching)

    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'password','password','password',[required,maxLength100])}
            <button disabled={ isFetching } >Save</button>
            {props.error && <span className={c.error}>{props.error}</span>}
            <span>{resetMsg ? resetMsg : 'in processing'}</span>
            { resetMsg && <Redirect to='/auth/login'/>}
        </form>
    )
}

const SavePasswordReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'save_password'
})(SavePasswordForm)

const ResetPage: React.FC<any> = props => {

    const dispatch = useDispatch()
    const urlData = useRouteMatch()

    console.log(urlData)

    const onSubmit = (data: SubmitingDataType) => {
        //@ts-ignore
        dispatch(savePassword(urlData.params.userId, urlData.params.token, data.password))
    }


    if(props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
            <SavePasswordReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default ResetPage