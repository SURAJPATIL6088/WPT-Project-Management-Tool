import axios from 'axios';

export function loginAdmin(formData){
    return axios.post("http://localhost:5000/api/auth/login", formData);
}

export function storeToken(token){
    localStorage.setItem("token", token);
}

export function removeToken(token){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");
}
