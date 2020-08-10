import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { auth_api, Login } from "../api/api"
import { stopSubmit } from "redux-form"

const initialState = {
    isAuth: false,
    resetMsg: null as string | null,
    successfullResetMsg: null as string | null,
    newUserMsg: null as string | null
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
        case 'toDoList/auth/setResetMsg': {
            return {
                ...state,
                resetMsg: action.resetMsg
            }
        }
        case 'toDoList/auth/setSuccessfullResetMsg': {
            return {
                ...state,
                successfullResetMsg: action.msg
            }
        }
        case 'toDoList/auth/setNewUser': {
            return {
                ...state,
                newUserMsg: action.msg
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
    setResetMsg: (resetMsg: string | null) => ({
        type: 'toDoList/auth/setResetMsg',
        resetMsg
    } as const),
    setSuccessfullResetMsg: (msg: string | null) => ({
        type: 'toDoList/auth/setSuccessfullResetMsg',
        msg
    } as const),
    setNewUser: (msg: string | null) => ({
        type: 'toDoList/auth/setNewUser',
        msg
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getLogin = (loginData: any): Thunk => async (dispatch) => {
    try {
        const data: Login = await auth_api.login(loginData)
        localStorage.setItem('token', data.token)
        dispatch(actions.setLogin())
        dispatch(actions.setNewUser(null))
        dispatch(actions.setResetMsg(null))
        dispatch(actions.setSuccessfullResetMsg(null))

    } catch(err) {
        if(err.response.status === 401) {
            dispatch(stopSubmit('login',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
        if(err.response.status === 404) {
            dispatch(stopSubmit('login',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
        if(err.response.status === 422) {
            dispatch(stopSubmit('login',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
    }
}

export const getRegister = (registerData: any): Thunk => async (dispatch) => {
    try {
        const data = await auth_api.register(registerData)
        dispatch(actions.setNewUser(data.data.message))
        debugger

    } catch(err) {
        if(err.response.status === 404) {
            dispatch(stopSubmit('register',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
        }
        if(err.response.status === 422) {
            dispatch(stopSubmit('register',{_error: err.response.data.error ? err.response.data.error : 'some input error'}))
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

export const getResetPassword = (email: string): Thunk => async (dispatch) => {
    try {
        const data = await auth_api.resetPassword(email)
        dispatch(actions.setResetMsg(data.message))
        

    } catch(e) {
        if(e.response.status === 404) {
            dispatch(stopSubmit('reset',{_error: e.response.data.error ? e.response.data.error : 'some input error'}))
        }
        if(e.response.status === 422) {
            dispatch(stopSubmit('reset',{_error: e.response.data.error ? e.response.data.error : 'some input error'}))
        }
    }
}

export const savePassword = (userId: string, token: string, password: string): Thunk =>
    async (dispatch) => {
    try {

        await auth_api.savePassword(userId, token, password)
        dispatch(actions.setSuccessfullResetMsg('password successfully saved'))

    } catch(e) {
        if(e.response.status === 422) {
            dispatch(stopSubmit('save_password',{_error: e.response.data.error ? e.response.data.error : 'some input error'}))
        }
    }
}



export default authReducer