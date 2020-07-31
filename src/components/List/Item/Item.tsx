import React, { FC, useState } from 'react'
import { title } from 'process'
import c from './Item.module.css'
import UpdatePostForm from './UpdatePostForm/UpdatePostForm'

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
            <li className={'collection-item'}>
                <div className='content'>
                    { props.title }
                </div>
                <div className='btn-panel'>
                    <button onClick={ () => editMode ? setEditMode(false) : setEditMode(true) } className='btn primary'>Update</button> 
                    { editMode && <UpdatePostForm postId={props.id} /> }
                    <button className='btn red' onClick={ () => props.removePost(props.id) }>Remove</button>
                </div>
            </li>
        </>
    )
})

export default Item