import {create} from "zustand";
import { axiosInstence } from "../lib/axios.js";

export const useAuthStore = create((set) =>({
    authUser: null,
    isSignUp: false,
    isLoggedin:false,
    isUpdationgProfile:false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try{
            const res = await axiosInstence.get("/auth/check");
            set({authUser:res.data});
        }catch(error){
            console.log("error in checkauth", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth:false})
        }
        
    }
}));