import { baseURL } from "../axiosIntance";

const Contact_ENDPOINTS = {
  createContact: `${baseURL}/api/contacts/`,
  getAllContact: `${baseURL}/api/contacts/`,
  getSingleContact: (id) => `${baseURL}/api/contacts/${id}`,
  deleteContact: (id) => `${baseURL}/api/contacts/${id}`,
};

export default Contact_ENDPOINTS;
