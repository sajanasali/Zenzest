import { Component } from '@angular/core';
import { medicHistoary, profileResponse, profiledisplay } from '../Model/Usermodel';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  data!:profiledisplay;
  profileDataSub: Subscription | undefined;
  constructor( private service:UserService,private router:Router){}
  ngOnInit(){
    
     this.getuserInfo();
  
  }
  

  getuserInfo(){
    //const doctorId = this.doctorservice.getDoctorId
    //console.log("doctorId",doctorId)
    this.profileDataSub = this.service.getProfileData().subscribe({
      next:(res)=>{
        console.log(res,"response from profile")
        this.data = ((res as profileResponse).data)
        console.log(this.data)
      },
      error:(err:any)=>{
        console.error('API request error:', err);
  
      }
    })
      
  }
  RedirectToMedhistory(){
this.router.navigate(['dashboard/medicalHistory'])
  }
  
  ngOnDestroy() {
    if (this.profileDataSub) {
      this.profileDataSub.unsubscribe();
    }
  }
  
}
