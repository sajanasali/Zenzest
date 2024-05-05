import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { appointmentDetails } from 'src/app/user/Model/Usermodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patients-today',
  templateUrl: './patients-today.component.html',
  styleUrls: ['./patients-today.component.css']
})
export class PatientsTodayComponent implements OnInit {
 
  constructor(private doctorservice:DoctorService){}
  datas:appointmentDetails[]=[]
  todaysappointment:Subscription | undefined
   ngOnInit(): void {
    
  this.getappointment()
  
   }
  
   getappointment(){
    this.todaysappointment=this.doctorservice.TodaysAppointments().subscribe((response:any)=>{
      this.datas=response.data
     })
   }

}
