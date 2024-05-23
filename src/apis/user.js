import {ApiClient} from "./"


const login = (payload) => ApiClient.post("/api/account/login",payload)

const register =(payload) => ApiClient.post("/api/account/register",payload)

const listUserBan = (payload) => ApiClient.get(`/api/user/banned?page=${payload.page}&limit=${payload.limit}&sort=${payload.orderBy}&ban=${payload.ban}`)




export  {
    login,register,listUserBan
}