import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { list_api, List, RemovedPost } from "../api/api"

export type Item = {
    date: string,
    _id: string,
    title: string
}

const initialState = {
    list: [] as Array<Item>,
    pageCount: 0
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const listReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'toDoList/list/setList': {
            return {
                ...state,
                list: action.list,
                pageCount: action.pageCount
            }
        }
        case 'toDoList/list/setRemovePost': {
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.postId)
            }
        }
        default: return state
    }
}

export const actions = {
    setList: (list: Array<Item>, pageCount: number) => ({
        type: 'toDoList/list/setList',
        list,
        pageCount
    } as const),
    setRemovedPost: (postId: string) => ({
        type: 'toDoList/list/setRemovePost',
        postId
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getList = (page: number): Thunk => async (dispatch) => {
    try {
        //@ts-ignore
        const data: List = await list_api.getList(page)
        dispatch(actions.setList(data.list, data.pageCount))
    } catch(err) {
        console.log(err)
    }
}

export const removePost = (postId: string): Thunk => async (dispatch) => {
    try {
        //@ts-ignore
        const data: RemovedPost = await list_api.removePost(postId)
        dispatch(actions.setRemovedPost(data.postId))
    } catch(err) {
        console.log(err)
    }
}




export default listReducer