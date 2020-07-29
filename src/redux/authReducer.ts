import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { auth_api, Login } from "../api/api"
import { stopSubmit } from "redux-form"

const initialState = {
    isAuth: false,
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const authReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'toDoList/auth/setLogin': {
            return {
                ...state,
                isAuth: true
            }
        }
        case 'toDoList/auth/setLogout': {
            return {
                ...state,
                isAuth: false
            }
        }
        case 'toDoList/auth/setRegister': {
            return {
                ...state,
            }
        }
        default: return state
    }
}

export const actions = {
    setLogin: () => ({
        type: 'toDoList/auth/setLogin'
    } as const),
    setLogout: () => ({
        type: 'toDoList/auth/setLogout',
    } as const),
    setRegister: () => ({
        type: 'toDoList/auth/setRegister',
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getLogin = (loginData: any): Thunk => async (dispatch) => {
    try {
        const data: Login = await auth_api.login(loginData)
        localStorage.setItem('token', data.token)
        dispatch(actions.setLogin())

    } catch(err) {
        if(err.response.status === 401) {
            dispatch(stopSubmit('login',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
    }
}

export const getLogout = (): Thunk => async (dispatch) => {
    try {
        localStorage.removeItem('token')
        dispatch(actions.setLogout())

    } catch(e) {
        console.log(e)
    }
}

export default authReducer