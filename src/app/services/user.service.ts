import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpFeature,HttpHandler,HttpParams,HttpHeaders } from '@angular/common/http';
import { Users,UserModel,Userinfo, loginInfo, profileData, GetUsers,appointmentDetails } from '../user/Model/Usermodel';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private store:Store) { }


  APIBaseUrl=environment.baseUrl;
  UserRegisteration(userdata: Users) {
    console.log(userdata,"testing")
    return this.http.post(this.APIBaseUrl +`register`, userdata);
   
  }
  UserRegistrationGoogle(googleAccessToken:string){
    
    return this.http.post(this.APIBaseUrl +`register/google`,googleAccessToken)
  }
  sendOtp(email: {}): Observable<any> {
    // Send a request to your backend to initiate OTP sending
    console.log('Sending email:', email);
    return this.http.post(this.APIBaseUrl +`otp`,email);
   
  }
  Userprofile(userdata: profileData) {
    console.log(userdata,"testing")
    return this.http.post(this.APIBaseUrl +`profile`, userdata);
   
  }
  cancelAppointment(data:appointmentDetails[]){
    console.log(data,"data in service")
    return this.http.post(this.APIBaseUrl +`cancelAppointment`, data);
  }
  verifyOtp(userData: {}): Observable<any> {
    return this.http.post(this.APIBaseUrl + 'otp/verify', userData);
  }
   
  loginUser(loginData:loginInfo){
    console.log(loginData)
    return this.http.post(this.APIBaseUrl+`login`,loginData)
   
  }
  sendEmail(email:{}){
    return this.http.post(this.APIBaseUrl+ `forgotpassword`,email)
  }
  updatePassword(datas:{}){
    return this.http.patch(this.APIBaseUrl+`Updatepassword`,datas)
  }
  medicalHistory(data:{}){
    return this.http.post(this.APIBaseUrl+`medicalhistory`,data)
  }

  
  SetUserToLoaclStorage(email: string) {
    localStorage.setItem('userdata', JSON.stringify({ email }));
  }
  getProfileData(){
    return this.http.get(this.APIBaseUrl+`profile`)
  }

  postPaymentData(doctorData:any,slot:any){
    return this.http.post(this.APIBaseUrl+`paymentonline`,{doctorData,slot})
  }
  getUsers():Observable<GetUsers[]>{
    return this.http.get<GetUsers[]>(this.APIBaseUrl+`getusers`)
    
    
  }

  
  getAppointment():Observable<appointmentDetails[]>{
      return this.http.get<appointmentDetails[]>(this.APIBaseUrl+'appointmentDetail')
  }
 getAppStatus(id:string){
  return this.http.get(this.APIBaseUrl+`getAppstatus/${id}`)
 }
 endAppointment(id:string){
  return this.http.put(this.APIBaseUrl+`appointment-completed/${id}`,{})
}

  GetdataFromStorage(): string {
    let userEmail: string = '';
  
    if (localStorage.getItem('userdata') !== null) {
      try {
        const jsonstring = localStorage.getItem('userdata') as string;
        const storedUserData = JSON.parse(jsonstring);
  
        // Assuming 'email' is the property you want to retrieve
        if (storedUserData && storedUserData.email) {
          userEmail = storedUserData.email;
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  
    return userEmail;
  }
  

  

}