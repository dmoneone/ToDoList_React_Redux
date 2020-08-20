import React from 'react'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createField, Input } from '../../../Form/Form'
import { maxLength } from '../../../../form_validation_checks/formChecks'
import { updatePost } from '../../../../redux/listReducer'
import saveI from '../../../../assets/icons/save.png'
import c from '../Item.module.scss'


const maxLength100 = maxLength(100)
const maxLength50 = maxLength(50)

type SubmitingDataType = {
    title: any
}

type OwnFormProps = {
    initialValues: string,
    turnOffEditMode: () => void
}

type NameType = Extract<keyof SubmitingDataType,string>

const UpdatePostForm: React.FC<InjectedFormProps<SubmitingDataType, OwnFormProps> & OwnFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.editForm}>
            {createField<NameType>(Input,'title','text','title',[maxLength100])}
            <button data-title='save changes' className={c.btn}><img src={saveI} alt=""/></button>
        </form>
    )
}

const UpdatePostReduxForm = reduxForm<SubmitingDataType, OwnFormProps>({
    form: 'updatePostForm'
})(UpdatePostForm)

type MapDispatch = {
    updatePost: (postId: string, title: string) => void
}

type OwnProps = {
    postId: string,
    initialValues: any,
    turnOffEditMode: () => void
}

type Props = MapDispatch & OwnProps

const UpdateForm: React.FC<Props> = props => {
    const onSubmit = async (data: SubmitingDataType) => {
        await props.updatePost(props.postId, data.title)
        props.turnOffEditMode()
    }
    return (
        <div>
            <UpdatePostReduxForm 
                onSubmit={onSubmit}
                initialValues={props.initialValues}
                turnOffEditMode={props.turnOffEditMode}
            />
        </div>
    )
}
//@ts-ignore
export default connect(null , {updatePost})(UpdateForm)
