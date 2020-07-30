import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Item as ItemType, getList, removePost } from '../../redux/listReducer'
import { GlobalState } from '../../redux/redux_store'
import Paginator from './Paginator/Paginator'
import Item from './Item/Item'
import shortid from 'shortid'

type MapState = {
    list: Array<ItemType>,
    pageCount: number
}

type MapDispatch ={
    getList: (page: number) => void
    removePost: (postId: string) => void
}

type Props = MapState & MapDispatch

const List: FC<Props> = (props) => {

    useEffect(() => {
        props.getList(1)
    }, [])

    console.log(props.list, '__')

    return (
        <div>
            <ul className={'collection'}>
                { props.list.length >= 0 && props.list.map(item => {
                    return <Item
                        key={item._id}
                        id={item._id}
                        date={item.date}
                        title={item.title}
                        removePost={props.removePost}
                    />
                }) }
            </ul>
            <Paginator 
                getList={props.getList}
                list={props.list}
                pageCount={props.pageCount}
            />
        </div>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    list: state.listReducer.list,
    pageCount: state.listReducer.pageCount
})

export default connect(mapStateToProps, { getList, removePost })(withAuthRedirect(List))
