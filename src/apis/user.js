import {ApiClient} from "./"


const login = (payload) => ApiClient.post("/api/account/login",payload)

const register =(payload) => ApiClient.post("/api/account/register",payload)

const listUser = (payload) => ApiClient.get(`/api/user?page=${payload.page}&limit=${payload.limit}`)

const detailUser = payload => ApiClient.get(`/api/user/${payload.id}`)

const searchUser = payload => ApiClient.get(`/api/user/search?phone=${payload.phone}`)

const selectUser = () => ApiClient.get(`/api/user/select`)


export  {
    login,register,listUser,detailUser,searchUser,selectUser
}