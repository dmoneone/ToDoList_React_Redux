import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { list_api, List } from "../api/api"

export type Item = {
    date: string,
    _id: string,
    title: string
}

const initialState = {
    list: [] as Array<Item>
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const listReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'toDoList/list/setList': {
            return {
                ...state,
                list: action.list
            }
        }
        default: return state
    }
}

export const actions = {
    setList: (list: Array<Item>) => ({
        type: 'toDoList/list/setList',
        list
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getList = (page: number): Thunk => async (dispatch) => {
    try {
        //@ts-ignore
        const data: List = await list_api.getList(page)
        dispatch(actions.setList(data.list))
    } catch(err) {
        console.log(err)
    }
}


export default listReducer