import { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"

const initialState = {
    initialization: false
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const appReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'toDoList/initialization/setInit': {
            return {
                ...state,
                initialization: true
            }
        }
        default: return state
    }
}

export const actions = {
    setInit: () => ({
        type: 'toDoList/initialization/setInit'
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getInit = (): Thunk => async (dispatch, getState) => {
    dispatch(actions.setInit())
}


export default appReducer