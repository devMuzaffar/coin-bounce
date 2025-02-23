import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//
// Authentication
//

export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const register = async (data) => {
  let response;
  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const signout = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }
  return response;
};

//
// Blogs
//

export const getAllBlogs = async () => {
  let response;
  try {
    response = await api.get("/blog/all");
  } catch (error) {
    return error;
  }
  return response;
};

export const submitaBlog = async (data) => {
  let response;
  try {
    response = await api.post("/blog", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const getBlogById = async (id) => {
  let response;
  try {
    response = await api.get(`/blog/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteBlog = async (id) => {
  let response;
  try {
    response = await api.delete(`/blog/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const updateBlog = async (data) => {
  let response;
  try {
    response = await api.put(`/blog`, data);
  } catch (error) {
    return error;
  }
  return response;
};

//
// Comments
//

export const getCommentsById = async (id) => {
  let response;
  try {
    response = await api.get(`/comment/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const postComment = async (data) => {
  let response;
  try {
    response = await api.post(`/comment`, data);
  } catch (error) {
    return error;
  }
  return response;
};
