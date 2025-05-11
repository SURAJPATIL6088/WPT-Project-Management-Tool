import axios from 'axios';

export function loginAdmin(formData){
    return axios.post("http://localhost:5000/api/auth/login", formData);
}

export function storeToken(token){
    localStorage.setItem("token", token);
}

export function removeToken(){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");
}

export function storeRole(role){
    localStorage.setItem("role", role);
}

export function removeRole(){
    localStorage.removeItem("role");
}

export function getRole(){
    return localStorage.getItem("role");
}