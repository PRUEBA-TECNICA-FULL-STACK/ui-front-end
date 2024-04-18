import User from "@/models/User";
import  AxiosIn  from "@/utils/AxiosIn";
import Cookies from "js-cookie";
import { useState } from "react";

export const useLogin = () => {
   
    const login = async (email: string, password: string) => {
        AxiosIn.post("api/v1/login",{email,password}).then((response:any)=>{
            
                
                const existed: User= {
                    id:response.data.user.id,
                    name:response.data.user.name,
                    email:response.data.user.email,
                    accessToken:response.data.access_token,
                }

                Cookies.set("currentUser",JSON.stringify(existed));
                
            
                return window.location.href="/";;
        }).catch((error:any)=>{
            alert(error.response.data.status)  
        });
        
        
    }
   
    
    return {login}
        
    };
       
