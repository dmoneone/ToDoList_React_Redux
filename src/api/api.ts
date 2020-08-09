import axios from 'axios'
import store from '../redux/redux_store'
import { actions } from '../redux/authReducer'
import { Item } from '../redux/listReducer'

const a = axios.create({
    //baseURL: 'https://blooming-stream-23263.herokuapp.com/api/',
    baseURL: 'http://localhost:3005/api/',
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
    },
    resetPassword(email: string) {
        return a.post('auth/reset', { email })
                .then(res => res.data)
    },
    savePassword(userId: string, token: string, password: string){
        return a.post('auth/password', { userId, token, password })
                .then(res => res.data)
    }
}


export type Profile = {
    user: {
        email: string | null,
        name: string | null,
        userId: string | null,
        avatarUrl: string | null
    }
}

export const profile_api = {
    getProfile() {
        const token = localStorage.getItem('token')
        if(!token) return 

        return a.get<Profile>('profile', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    setAvatar(file: any) {
        const token = localStorage.getItem('token')
        if(!token) return 

        const formData = new FormData();
        formData.append("avatar", file);

        return a.post('profile/addAvatar', formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}

export type List = {
    list: Array<Item>,
    userId: string,
    pageCount: number
}

export interface RemovedPost  {
    postId: string,
    message: string
}

export interface UpdatedPost extends RemovedPost {
    newTitle: string
}

export interface AddedPost {
    message: string,
    newPostTitle: string,
    id: string
}

export const list_api = {
    getList(page: number) {
        const token = localStorage.getItem('token')
        if(!token) return 

        return a.get<List>(`list?page=${page}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    addPost<AddedPost>(title: string) {
        const token = localStorage.getItem('token')
        if(!token) return 

        return a.post(`list/addPost`, { title } ,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    updatePost<UpdatedPost>(postId: string, title: string) {
        const token = localStorage.getItem('token')
        if(!token) return 

        return a.put(`list/updatePost`, { postId, title } ,{
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    
    },
    removePost<RemovedPost>(postId: string) {
        const token = localStorage.getItem('token')
        if(!token) return 

        return a.delete(`list/removePost/${postId}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    clearList() {
        const token = localStorage.getItem('token')
        if(!token) return 
        
        return a.delete(`list/clearList`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    }
}