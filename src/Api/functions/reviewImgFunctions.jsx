import axiosInstance from "../axiosIntance";
import REVIEWIMG_ENDPOINTS from "../endPoint/reviewImgEndPoint";


export const getAllReviewImg = async (setReviewData)=>{
    try {
        const res= await axiosInstance.get(REVIEWIMG_ENDPOINTS.getAllReviewImg)
        if(res){
            setReviewData(res.data.data)
        }
    } catch (error) {
        console.log(error);
        
    }
}