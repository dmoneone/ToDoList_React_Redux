import store, { ActionsTypes, GlobalState } from "./redux_store"
import { ThunkAction } from "redux-thunk"
import { profile_api, Profile } from "../api/api"
import {  getLogout } from './authReducer'

const initialState = {
    user: {
        email: null as string | null,
        userId: null as string | null,
        name: null as string | null,
        avatarUrl: null as string | null,
    }
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const profileReducer = (state: State = initialState, action: ActionTypes): State  => {
    switch(action.type) {
        case 'toDoList/profile/setProfile': {
            return {
                ...state,
                user: {...action.profileData}
            }
        }
        default: return state
    }
}

type User = typeof initialState.user

export const actions = {
    setProfile: (profileData: User) => ({
        type: 'toDoList/profile/setProfile',
        profileData
    } as const),
}



type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getProfile = (): Thunk => async (dispatch) => {
    try {
        const data = await profile_api.getProfile() as Profile
        dispatch(actions.setProfile(data.user))

    } catch(err) {
        if(err.response.status === 401 && err.response.statusText === 'Unauthorized') {
            dispatch(getLogout())
        }
    }
    
}




export default profileReducer