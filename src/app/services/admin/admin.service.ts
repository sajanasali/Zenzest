import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsers, appointmentDetails } from 'src/app/user/Model/Usermodel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Doctor, Doctors } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  APIBaseUrl=environment.adminBaseurl
  constructor(private http:HttpClient) { }

  
 
  getUsers():Observable<GetUsers[]>{
    return this.http.get<GetUsers[]>(this.APIBaseUrl+`getusers`)
    
    
  }
  getAppointments():Observable<appointmentDetails[]>{
    return this.http.get<appointmentDetails[]>(this.APIBaseUrl+'bookings')
}
blockDoctor(doctorId:string){
  console.log(doctorId,"doctor Id")
  return this.http.put(this.APIBaseUrl+`blockdoctor`,{doctorId})
}
blockUser(userId:string){
  console.log(userId,"doctor Id")
  return this.http.put(this.APIBaseUrl+`blockuser`,{userId})
}

createDoctor(data:Doctors){
  return this.http.post(this.APIBaseUrl+`createDoctor`,data)
}
}
