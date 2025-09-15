import axiosInstance from "../axiosIntance";
import Gallery_ENDPOINTS from "../endPoint/galleryEndPoint";


export const getAllGallery = async (setGallaryData)=>{
    try {
        const res= await axiosInstance.get(Gallery_ENDPOINTS.getAllGallery)
        if(res){
            setGallaryData(res.data.data)
           
        }
    } catch (error) {
        console.log(error);
        
    }
}