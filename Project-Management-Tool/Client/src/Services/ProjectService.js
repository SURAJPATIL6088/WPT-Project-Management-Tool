import axios from 'axios';
import { getToken } from './AdminService';

const token = getToken();

export function fetchProjects(){
    return axios.get("http://localhost:5000/api/projects", {
        headers:{'Authorization':`Bearer ${token}`}
    });
}

export function createProject(projectData){
    return axios.post(`http://localhost:5000/api/projects`, projectData, {
        headers:{'Authorization':`Bearer ${token}`}
    })
}

export function deleteProject(id){
    return axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers:{'Authorization':`Bearer ${token}`}
    });
}

export function updateProject(id){
    return axios.put(`http://localhost:5000/api/projects/${id}`, {
        headers:{'Authorization':`Bearer ${token}`}
    });
}

/*
name
des
assign
project lead
create date
deadline
type(sector)
status(complete, end, )
*/