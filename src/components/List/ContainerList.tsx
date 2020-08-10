import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { connect } from 'react-redux'
import { Item as ItemType, getList, removePost, clearList } from '../../redux/listReducer'
import { GlobalState } from '../../redux/redux_store'
import List from './List'


type MapState = {
    list: Array<ItemType>,
    pageCount: number
}

type MapDispatch ={
    getList: (page: number) => void
    removePost: (postId: string) => void
    clearList: () => void
}

type Props = MapState & MapDispatch

const ContainerList: FC<Props> = (props) => {
 
    useEffect(() => {
        props.getList(1)
    }, [])

    

    return (
        <div>
            <List {...props}/>
        </div>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    list: state.listReducer.list,
    pageCount: state.listReducer.pageCount
})

export default connect(mapStateToProps, { getList, removePost, clearList })(withAuthRedirect(ContainerList))
