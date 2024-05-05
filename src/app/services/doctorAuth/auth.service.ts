import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpFeature,HttpHandler,HttpParams,HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Doctors, loginInfo } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private store:Store) { }

  APIBaseUrl=environment.doctorBaseurl;

  DoctorRegisteration(data: Doctors) {
    console.log(data,"testing")
    return this.http.post(this.APIBaseUrl +`register`, data);
   
  }

  sendOtp(email: {}): Observable<any> {
    // Send a request to your backend to initiate OTP sending
    console.log('Sending email:', email);
    return this.http.post(this.APIBaseUrl +`otp`,email);
   
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


  public setToken(jwtToken:string){
    localStorage.setItem('jwtToken',jwtToken)
   }
   public getToken(){
    return localStorage.getItem('DoctorToken')
   }
   deleteToken(){
    localStorage.removeItem('DoctorToken');
  }

  getDoctorPayload(){
    let token = this.getToken();
    if(token){
      let doctorPayload = atob(token.split('.')[1]);
      return JSON.parse(doctorPayload);
    }
    else return null
  }
  getUserId(){
    let userPayload = this.getDoctorPayload();
    let userId = userPayload._id;
    return userId;
  }

   public clear(){
    localStorage.clear()
   }
   public isLoggedin(){
    
    // return this.getToken()
    const token = localStorage.getItem('doctorToken'); // get token from local storage

    const payload = atob(token!.split('.')[1]); // decode payload of token

    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    
    
   }

}
