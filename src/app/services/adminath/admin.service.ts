import { Injectable } from '@angular/core';
import { loginInfo } from 'src/app/admin/AdminModel/adminModel';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  APIBaseUrl=environment.adminBaseurl
  constructor(private http:HttpClient) { }

  loginAdmin(loginData:loginInfo){
    console.log(loginData)
    return this.http.post(this.APIBaseUrl+`login`,loginData)
   
  }

  public setToken(jwtToken:string){
    localStorage.setItem('jwtToken',jwtToken)
   }
   public getToken(){
    return localStorage.getItem('AdminToken')
   }
   deleteToken(){
    localStorage.removeItem('AdminToken');
  }

  getDoctorPayload(){
    let token = this.getToken();
    if(token){
      let adminPayload = atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
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
    const token = localStorage.getItem('adminToken'); // get token from local storage

    const payload = atob(token!.split('.')[1]); // decode payload of token

    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    
    
   }
}
