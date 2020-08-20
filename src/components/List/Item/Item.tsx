import React, { FC, useState } from 'react'
import { title } from 'process'
import c from './Item.module.scss'
import UpdatePostForm from './UpdatePostForm/UpdatePostForm'
import rmvI from '../../../assets/icons/rmv.png'
import edtI from '../../../assets/icons/edit.png'

interface Props {
    title: string,
    date: string,
    removePost: (postId: string) => void,
    id: string
}

const Item: FC<Props> = React.memo(props => {

    const [editMode, setEditMode] = useState(false)
    
    return (
        <>  
            <li className={c.list_item} >
                <div className={c.content}>
                    <p>
                        { !editMode && props.title } 
                        { editMode && <UpdatePostForm turnOffEditMode={ () => setEditMode(false) } initialValues={{title: props.title}} postId={props.id} /> }
                    </p>
                    <time>Added at: {props.date.toString()}</time>
                </div>
                <div className={c['btn-panel']}>
                    <button data-title='edit item' className={c.btn} onClick={ () => editMode ? setEditMode(false) : setEditMode(true) }><img src={edtI} /></button> 
                    <button data-title='remove item' className={c.btn} onClick={ () => props.removePost(props.id) }><img src={rmvI} /></button>
                </div>
            </li>
        </>
    )
})

export default Item