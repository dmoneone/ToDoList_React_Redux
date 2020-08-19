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
                    <time>{props.date.toString()}</time>
                    <p>
                        { !editMode && props.title } 
                        { editMode && <UpdatePostForm initialValues={{title: props.title}} postId={props.id} /> }
                    </p>
                </div>
                <div className={c['btn-panel']}>
                    <button className={c.btn} onClick={ () => editMode ? setEditMode(false) : setEditMode(true) }><img src={edtI} /></button> 
                    <button className={c.btn} onClick={ () => props.removePost(props.id) }><img src={rmvI} /></button>
                </div>
            </li>
        </>
    )
})

export default Item