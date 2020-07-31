import React, { FC, useEffect } from 'react'
import Paginator from './Paginator/Paginator'
import Item from './Item/Item'
import { Item as ItemType } from '../../redux/listReducer'
import AddNewPostForm from './AddNewPostForm/AddNewPostForm'

type Props = {
    list: Array<ItemType>,
    pageCount: number,
    getList: (page: number) => void
    removePost: (postId: string) => void
    clearList: () => void
}

const List: FC<Props> = React.memo(props => {

    return (
        <div>
            <AddNewPostForm/>
            <button onClick={() => props.clearList()}>Clear List</button>
            <ul className={'collection'}>
                { props.list.length > 0 && props.list.map(item => {
                    return <Item
                        key={item._id}
                        id={item._id}
                        date={item.date}
                        title={item.title}
                        removePost={props.removePost}
                    />
                }) }
                { props.list.length === 0 && <span>No Items</span>}
            </ul>
            <Paginator 
                getList={props.getList}
                list={props.list}
                pageCount={props.pageCount}
            />
        </div>
    )
})


export default List
