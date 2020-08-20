import React, { FC, useEffect } from 'react'
import Paginator from './Paginator/Paginator'
import Item from './Item/Item'
import { Item as ItemType } from '../../redux/listReducer'
import AddNewPostForm from './AddNewPostForm/AddNewPostForm'
import c from './List.module.scss'
import cItem from './Item/Item.module.scss'
import binI from '../../assets/icons/bin.png'

type Props = {
    list: Array<ItemType>,
    pageCount: number,
    getList: (page: number) => void
    removePost: (postId: string) => void
    clearList: () => void
}

const List: FC<Props> = React.memo(props => {

    return (
        <div className={c.list}>
            <div className={c.btn_panel}>
                <button data-title='remove all items' className={cItem.btn} onClick={() => props.clearList()}><img src={binI} /></button>
                <span className={c.itemsLen}>Items: {props.list.length}</span>
            </div>
            <AddNewPostForm/>
            <span className={c.tasks}>Your tasks: </span>
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
                { props.list.length === 0 && <span className={c.noItems}>No Items</span>}
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

