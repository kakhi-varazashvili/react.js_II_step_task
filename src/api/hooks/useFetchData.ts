import { useQuery } from "react-query";
import axiosInstance from "../config/axoisConfig";

export const useFetchData = (searchWord: string) => {
  return useQuery(["data", searchWord], async () => {
    if (searchWord.trim() === "") {
        const { data } = await axiosInstance.get(`/photos/?query=${searchWord}&per_page=20&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
        return data;
    }

    const { data } = await axiosInstance.get(`/search/photos/?query=${searchWord}&per_page=20&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
    
    return data.results;
  });
};
