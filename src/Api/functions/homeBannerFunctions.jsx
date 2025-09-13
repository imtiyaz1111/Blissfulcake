import axiosInstance from "../axiosIntance";
import HomeBanner_ENDPOINTS from "../endPoint/homeBannerEndPoint";


export const getAllBanner = async (setBannerData)=>{
    try {
        const res= await axiosInstance.get(HomeBanner_ENDPOINTS.getAllHomeBanner)
        if(res){
            setBannerData(res.data.data)
           
        }
    } catch (error) {
        console.log(error);
        
    }
}