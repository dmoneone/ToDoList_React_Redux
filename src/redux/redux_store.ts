import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'; 
import authReducer, { actions } from './authReducer';
import appReducer from './appReducer';
import { reducer as formReducer } from 'redux-form'
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
    authReducer,
    appReducer,
    profileReducer,
    form: formReducer,
})

type RootReducer = typeof rootReducer
export type GlobalState = ReturnType<RootReducer>

type PropsTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropsTypes<T>>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
//@ts-ignore
window.__store__ = store

window.addEventListener('load', (e) => {
    const token = localStorage.getItem('token')
    if(token) {
        store.dispatch(actions.setLogin())
    }  
})

export default store