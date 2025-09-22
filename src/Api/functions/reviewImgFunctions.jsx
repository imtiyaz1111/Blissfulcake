import { toast } from "react-toastify";
import axiosInstance from "../axiosIntance";
import REVIEWIMG_ENDPOINTS from "../endPoint/reviewImgEndPoint";


export const getAllReviewImg = async (setReviewData,setLoading)=>{
    try {
        setLoading(true)
        const res= await axiosInstance.get(REVIEWIMG_ENDPOINTS.getAllReviewImg)
        if(res){
            setReviewData(res.data.data)
        }
    } catch (error) {
        console.log(error);
        
    }finally {
    setLoading(false);
  }
}

// Upload Gallery
export const uploadReviewImg = async (formData, token, navigate, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.post(
      REVIEWIMG_ENDPOINTS.UPLOADREVIEWIMG,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/review/manage");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to upload review image");
  } finally {
    setLoading(false);
  }
};

// Delete Gallery
export const deleteReviewImg = async (id, token, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosInstance.delete(
      REVIEWIMG_ENDPOINTS.DELETEBREVIEWIMG(id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete Review image");
  } finally {
    setLoading(false);
  }
};
