import { baseURL } from "../axiosIntance";

const ADDRESS_ENDPOINTS = {
  createAddress: `${baseURL}/api/address/`,
  deleteAddress: (id)=>`${baseURL}/api/address/${id}`,
};

export default ADDRESS_ENDPOINTS;
