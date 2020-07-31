import React from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createField, Input } from '../../Form/Form'
import { required, maxLength } from '../../../form_validation_checks/formChecks'
import c from './AddNewPostFrom.module.css'
import { addPost } from '../../../redux/listReducer'


const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    title: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const AddNewPostFrom: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'title','text','title',[maxLength100])}
            <button>add</button>
            {props.error && <span className={c.error}>{props.error}</span>}
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'addNewPostForm'
})(AddNewPostFrom)

type MapDispatch = {
    addPost: (data: string) => void
}



type Props = MapDispatch

const addPostForm: React.FC<Props> = props => {
    const onSubmit = (data: SubmitingDataType) => {
        props.addPost(data.title)
    }
    return (
        <div>
            <AddNewPostReduxForm 
                onSubmit={onSubmit}
            />
        </div>
    )
}
//@ts-ignore
export default connect(null , {addPost})(addPostForm)

