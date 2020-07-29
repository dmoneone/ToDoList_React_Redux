import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Item, getList } from '../../redux/listReducer'
import { GlobalState } from '../../redux/redux_store'

type MapState = {
    list: Array<Item>
}

type MapDispatch ={
    getList: (page: number) => void
}

type Props = MapState & MapDispatch

const List: FC<Props> = (props) => {

    useEffect(() => {
        props.getList(1)
    }, [])

    console.log(props.list)

    return (
        <div>List</div>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    list: state.listReducer.list
})

export default connect(mapStateToProps, { getList })(withAuthRedirect(List))
 