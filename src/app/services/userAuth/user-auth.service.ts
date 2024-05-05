import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }


  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles))
   }
  //  public getRoles(){
  //    return JSON.parse(localStorage.getItem('roles'))
  //  }

  public getRoles() {
    const roles = localStorage.getItem('roles');
    if (roles !== null) {
      return JSON.parse(roles);
    }
    // Return an appropriate default value if 'roles' is not found in localStorage
    return null; // or return an empty array, or any other default value as per your application logic
  }
   public setToken(jwtToken:string){
    localStorage.setItem('jwtToken',jwtToken)
   }
   public getToken(){
    return localStorage.getItem('Token')
   }
   deleteToken(){
    localStorage.removeItem('Token');
  }

  getUserPayload(){
    let token = this.getToken();
    if(token){
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else return null
  }
  getUserId(){
    let userPayload = this.getUserPayload();
    let userId = userPayload._id;
    return userId;
  }

   public clear(){
    localStorage.clear()
   }
   public isLoggedin(){
    
     //return this.getToken()
     const token = localStorage.getItem('Token'); // get token from local storage

    const payload = atob(token!.split('.')[1]); // decode payload of token

    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    
    
   }

}
