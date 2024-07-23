import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Doctor, profileData,Prescription,dashData } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { appointmentDetails } from 'src/app/user/Model/Usermodel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  APIBaseUrl=environment.doctorBaseurl;

  doctorEditprofile(userdata: profileData) {
    
    return this.http.put(this.APIBaseUrl +`profileEdit`, userdata);
   
  }
  getDoctorProfileData(){
    return this.http.get(this.APIBaseUrl+`profiledata`);
  }
  getDoctors():Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.APIBaseUrl+`getdoctordata`)
    
    
  }
  getAppointments():Observable<appointmentDetails[]>{
    return this.http.get<appointmentDetails[]>(this.APIBaseUrl+'getAppointments')
}

ConfirmAppointment(id:string){
  return this.http.patch(this.APIBaseUrl+`confirmAppointment/${id}`,{})
}
CancelAppointment(id:string){
  return this.http.patch(this.APIBaseUrl+`cancelAppointment/${id}`,{})
}
  TodaysAppointments():Observable<appointmentDetails[]>{
    return this.http.get<appointmentDetails[]>(this.APIBaseUrl+'todaysAppointment')
  } 

  endAppointment(id:string){
    return this.http.put(this.APIBaseUrl+`appointment-completed/${id}`,{})
  }
  endPrescription(id:string){
    return this.http.put(this.APIBaseUrl+`prescription-completed/${id}`,{})
  }
  getAppStatus(id:string){
    return this.http.get(this.APIBaseUrl+`getStatus/${id}`)
  }
addPrescription(id:string,data:Prescription){
  return this.http.put(this.APIBaseUrl+`prescription/${id}`,data)
}

Imageupload(formData:FormData){
  
  return this.http.post(this.APIBaseUrl+`/uploadImage`,formData)
}
getAvailSlots(date:string){
  const params = new HttpParams().set('date', date);
  console.log(params,"date")
  return this.http.get(this.APIBaseUrl+`getAvailSlots`,{params})
}
getBookedSlots(date:string){
  const params = new HttpParams().set('date', date);
  return this.http.get(this.APIBaseUrl+`getBookedSlots`,{params})
}
addTimeSlots(timeslot:any){
  console.log(timeslot,"in service")
  return this.http.post(this.APIBaseUrl+`addtimeslot`,timeslot)
}

getDashdata():Observable<dashData[]>{
  return this.http.get<dashData[]>(this.APIBaseUrl+`getDashdata`)
}
  //HELPER METHODES

  setToken(token:string){
    localStorage.setItem('doctorToken',token);
  }
  getToken(){
    console.log("inside the gettoken")
    return localStorage.getItem('doctorToken');
  }
  getDoctorPayload(){
    let token =this.getToken();
    console.log("token in getpayload",token)
    if(token){
      let doctorPayload = atob(token.split('.')[1]);
      console.log(doctorPayload,"payload")
      return JSON.parse(doctorPayload);
    }else return null;
  }
  getDoctorId(){
    console.log("inside the getdoctorid")
    let doctorPayload = this.getDoctorPayload();
    let doctorId = doctorPayload._id;
    console.log(doctorId,"in helper methode")
    //return doctorId;
    return doctorId()
   //return JSON.parse(doctorId);
  }

  isLoggedIn(){
    let doctorPayload = this.getDoctorPayload();
    if(doctorPayload){
      return doctorPayload.exp >Date.now()/1000;
    }else return false;
  }

  deleteToken(){
    console.log('token deleted');
    
    localStorage.removeItem('doctorToken');
  }
}
