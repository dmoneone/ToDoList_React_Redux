import React, { FC } from 'react'
import { title } from 'process'
import c from './Item.module.css'

interface Props {
    title: string,
    date: string,
    removePost: (postId: string) => void,
    id: string
}

const Item: FC<Props> = React.memo(props => {
    return (
        <>  
            <li className={'collection-item'}>
                <div className='content'>
                    { props.title }
                </div>
                <div className='btn-panel'>
                    <button className='btn primary'>Update</button>
                    <button className='btn red' onClick={ () => props.removePost(props.id) }>Remove</button>
                </div>
            </li>
        </>
    )
})

export default Item