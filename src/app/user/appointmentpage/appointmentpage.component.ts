import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor, profileResponse, profiledisplay } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorDataService } from 'src/app/services/doctorData/doctor-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointmentpage',
  templateUrl: './appointmentpage.component.html',
  styleUrls: ['./appointmentpage.component.css']
})


export class AppointmentpageComponent  implements OnInit{
  //data:profiledisplay[]=[];
  doctors:Doctor[]=[]
  profileDataSub: Subscription | undefined;
  constructor( private doctorservice:DoctorService,private doctorDataservice:DoctorDataService,private router:Router){}

ngOnInit(): void {
  

  this.getDoctor();

}
 
getDoctor(): void {
  this.doctorservice.getDoctors()
    .subscribe((response:any) => {
      this.doctors = response.data;
     //this.doctorDataservice.setDoctors(this.doctors)
   
      console.log(this.doctors,"doctorrrrrrrr")
    });
}

onclick(doctor:Doctor){
  this.doctorDataservice.setDoc(doctor)
  this.router.navigate(['dashboard/booking']);
}
}
