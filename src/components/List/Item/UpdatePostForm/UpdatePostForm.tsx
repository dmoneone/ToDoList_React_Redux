import React from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createField, Input } from '../../../Form/Form'
import { maxLength } from '../../../../form_validation_checks/formChecks'
import { updatePost } from '../../../../redux/listReducer'


const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    title: string
}

type NameType = Extract<keyof SubmitingDataType,string>

const UpdatePostForm: React.FC<InjectedFormProps<SubmitingDataType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NameType>(Input,'title','text','title',[maxLength100])}
            <button>Save</button>
        </form>
    )
}

const UpdatePostReduxForm = reduxForm<SubmitingDataType, {}>({
    form: 'updatePostForm'
})(UpdatePostForm)

type MapDispatch = {
    updatePost: (postId: string, title: string) => void
}

type OwnProps = {
    postId: string
}

type Props = MapDispatch & OwnProps

const UpdateForm: React.FC<Props> = props => {
    const onSubmit = (data: SubmitingDataType) => {
        props.updatePost(props.postId, data.title)
    }
    return (
        <div>
            <UpdatePostReduxForm 
                onSubmit={onSubmit}
            />
        </div>
    )
}
//@ts-ignore
export default connect(null , {updatePost})(UpdateForm)
