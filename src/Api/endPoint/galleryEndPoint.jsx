import { baseURL } from "../axiosIntance";

const Gallery_ENDPOINTS = {
 getAllGallery: `${baseURL}/api/gallary/`,
  // protected + admin EndPoint
  UPLOADGALLERY: `${baseURL}/api/gallary/upload/`,
  DELETEGALLERY: (id) => `${baseURL}/api/gallary/${id}`,
};

export default Gallery_ENDPOINTS;
