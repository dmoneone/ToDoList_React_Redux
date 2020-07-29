import axios from 'axios'
import store from '../redux/redux_store'
import { actions } from '../redux/authReducer'
import { Item } from '../redux/listReducer'

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

export type List = {
    list: Array<Item>,
    userId: string
}

export const list_api = {
    getList(page: number) {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at list_api.getList')

        return a.get<List>(`list?page=${page}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    addPost(title: string) {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at list_api.addPost')

        return a.post(`list/addPost`, { title } ,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    updatePost(postId: string, title: string) {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at list_api.updatePost')

        return a.put(`list/updatePost`, { postId, title } ,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    removePost(postId: string) {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at list_api.removePost')

        return a.delete(`list/removePost/${postId}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    clearList() {
        const token = localStorage.getItem('token')
        if(!token) return console.error('token is null at list_api.clearList')

        return a.post(`list/clearList`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}