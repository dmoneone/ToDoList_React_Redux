import axios from 'axios'
import store from '../redux/redux_store'
import { actions } from '../redux/authReducer'

const a = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export interface Login {
    token: string
}

export const auth_api = {
    login<Login>(loginData: any) {
        return a.post('auth/login', loginData)
                .then(res => res.data)
    },
    register(registerData: any) {
        return a.post('auth/register', registerData)
    }
}


export type Profile = {
    user: {
        email: string | null,
        name: string | null,
        userId: string | null,
    }
}

export const profile_api = {
    getProfile() {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at profile_api.getProfile')
        return a.get<Profile>('profile', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}