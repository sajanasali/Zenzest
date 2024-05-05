
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
export interface profileData{
  name:string,
  qualification:string,
  education:string,
  experience:string,
  certification:string,
  profilepic:string
  

}
export interface appointmentDetails{
    _id:string,
    userId:User,
    doctorId:Doctor
    slotBooked:string,
    status:string,
    paymentmode:[],
    amountpaid:number,
    paymentstatus:string,
    prescription:[]

}


export interface Doctor {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    experience: string;
    isBlocked: boolean;
    isVerified: boolean;
    image: string;
    certification: string;
    education: string;
    qualification: string;
    bookedSlots: string[];
    slots: {
        date: string;
        timeslots: string[];
        _id: string;
    }[];
    status: string;
    fees: number;
}
export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
    isVerified: boolean;
    __v: number;
    address: string;
    allergies: string;
    height: number;
    reason: string;
    weight: number;
}

export interface GetUsers{
    name:string,
    email:string,
    address:string,
    isblocked:boolean,
    reason:string
}
export interface medicHistoary{
   
   
    gender:string,
    address:string,
    
    height:number,
    weight:number,
    blood:string,
    allergies:string,
    reason:string


}
export interface UserModel extends EntityState<Users>{
  
    userinfo:Userinfo
 }
 export interface profiledisplay {
        name:string,
        gender:string,
    address:string,
    
    height:number,
    weight:number,
    blood:string,
    allergies:string,
    reason:string,
    bloodgroup:string

 }
 export interface  profileResponse {
     data:profiledisplay
 }
export interface appointmentResponse {
        data:appointmentDetails
}