import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    },
});

// 
// Authentication
// 

export const login = async (data) => {
    let response;
    try {
        response = await api.post('/login', data);
    } catch (error) {
        return error;
    }
    return response;
}


export const register = async (data) => {
    let response;
    try {
        response = await api.post('/register', data);
    } catch (error) {
        return error;
    }
    return response;
}


export const signout = async () => {
    let response;
    try {
        response = await api.post('/logout');
    } catch (error) {
        return error;
    }
    return response;
}


// 
// Blogs
// 


export const getAllBlogs = async () => {
    let response;
    try {
        response = await api.get('/blog/all');
    } catch (error) {
        return error;
    }
    return response;
}


export const submitaBlog = async (data) => {
    let response;
    try {
        response = await api.post('/blog', data);
    } catch (error) {
        return error;
    }
    return response;
}