import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { profileResponse, profiledisplay } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  data!:profiledisplay;
  profileDataSub: Subscription | undefined;
  


  constructor( private doctorservice:DoctorService,private router:Router){}
    ngOnInit(): void {
      this.getDoctorInfo();
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

    logout(){
      localStorage.removeItem('doctorToken')
      localStorage.removeItem('email')
      localStorage.clear()
      this.router.navigate(['doctor/login'])
    }

}
