
import { EntityAdapter,EntityState } from "@ngrx/entity"
export interface Doctors{
 
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
export interface Doctorsinfo{
    name:string,
    email:string
}
export interface DoctorProfile{
    
}
export interface profileData{
  
    qualification:string,
    education:string,
    experience:string,
    certification:string,
 
    
  
  }
  export interface profiledisplay extends profileData{
    name:string
       image:string
  }
  export interface profileResponse{
    data:profiledisplay
  }
export interface DoctorModel extends EntityState<Doctors>{
  
    userinfo:Doctorsinfo
 }
 export interface Doctor {
  _id:string,
  name:string,
 
  image:string
  qualification:string,
    education:string,
    experience:string,
    certification:string,
   slots:Slot[],
   fees:number,
   isBlocked:boolean,
   compensation:number
}
export interface DoctorModel extends Doctor{
  _id:string,
  slots:Slot[]
}
interface Slot {
  date: string;
  timeslots: string[];
}
export interface response{
    message:string,
    success:boolean,
    data:[]
}
export interface StatusRes{
  status:string

}