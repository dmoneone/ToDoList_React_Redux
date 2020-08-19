import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { list_api, List, RemovedPost, UpdatedPost, AddedPost } from "../api/api"
import { title } from "process"

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
        case 'toDoList/list/setUpdatedPost': {
            const ind = state.list.findIndex(item => item._id === action.postId)
            const list = [...state.list]
            list[ind].title = action.title
            return {
                ...state,
                list
            }
        }
        case 'toDoList/list/setAddedPost': {
            return {
                ...state,
                list: [...state.list, {
                    title: action.title,
                    date: new Date().toDateString(),
                    _id: action.postId
                }] as Array<Item>
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
    } as const),
    setUpdatedPost: (postId: string, title: string) => ({
        type: 'toDoList/list/setUpdatedPost',
        postId,
        title
    } as const),
    setAddedPost: (title: string, postId: string) => ({
        type: 'toDoList/list/setAddedPost',
        title,
        postId
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getList = (page: number): Thunk => async (dispatch) => {
    try {
        const data = await list_api.getList(page) as List
        dispatch(actions.setList(data.list, data.pageCount))
    } catch(err) {
        console.log(err)
    }
}

export const addPost = (title: string): Thunk => async (dispatch) => {
    try {
        const data = await list_api.addPost(title) as AddedPost
        dispatch(actions.setAddedPost(data.newPostTitle, data.id))
    } catch(err) {
        console.log(err)
    }
}

export const removePost = (postId: string): Thunk => async (dispatch) => {
    try {
        const data: RemovedPost = await list_api.removePost(postId)
        dispatch(actions.setRemovedPost(data.postId))
    } catch(err) {
        console.log(err)
    }
}

export const updatePost = (postId: string, title: string): Thunk => async (dispatch) => {
    try {
        const data = await list_api.updatePost(postId, title) as UpdatedPost
        dispatch(actions.setUpdatedPost(data.postId, data.newTitle))
    } catch(err) {
        console.log(err)
    }
}

export const clearList = (): Thunk => async (dispatch) => {
    try {
        await list_api.clearList() 
        dispatch(actions.setList([], 0))
    } catch(err) {
        console.log(err)
    }
}




export default listReducer