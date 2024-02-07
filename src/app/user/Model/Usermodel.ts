
import { EntityAdapter,EntityState } from "@ngrx/entity"
export interface Users{
 
    name:string,
    password:string,
    cpassword:string,
    email:string,
  
    
    
    
   
    
}

export interface emailResponse{
    success: boolean;
  message: string;
  email: string;
}
  

export interface otp{
    email:string
}
export interface loginInfo{
    email:string,
    password:string
}
export interface Userinfo{
    name:string,
    email:string
}
export interface UserModel extends EntityState<Users>{
  
    userinfo:Userinfo
 }