import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { profiledisplay,profileResponse } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { jwtDecode } from 'jwt-decode';
//import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 constructor( private doctorservice:DoctorService){}
data!:profiledisplay;
profileDataSub: Subscription | undefined;


ngOnInit(){
  this.data = {
     image: '',
      name: '',
     education: '',
     experience: "",
     qualification:'',
     certification:''
   }
   this.getDoctorInfo();

}


 token = localStorage.getItem('doctorToken')
 if(token:any) {

  console.log("Token is there. TRUE");
  const decodeToken = jwtDecode(token)
  console.log("DEcodec token is  : ", decodeToken)
 // doctorId=decodeToken.id
}
getDoctorInfo(){
  //const doctorId = this.doctorservice.getDoctorId
  //console.log("doctorId",doctorId)
  this.profileDataSub = this.doctorservice.getDoctorProfileData().subscribe({
    next:(res)=>{
      console.log(res,"response from profile")
      this.data = ((res as profileResponse).data)
      console.log(this.data)
    },
    error:(err)=>{
      console.error('API request error:', err);

    }
  })
    
}


ngOnDestroy() {
  if (this.profileDataSub) {
    this.profileDataSub.unsubscribe();
  }
}

}
