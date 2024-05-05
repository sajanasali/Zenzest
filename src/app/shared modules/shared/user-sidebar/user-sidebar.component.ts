import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { profileResponse, profiledisplay } from 'src/app/user/Model/Usermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  data!:profiledisplay;
  profileDataSub: Subscription | undefined;
  constructor( private service:UserService,private router:Router){}
 
 
 
  
 ngOnInit(){
   
this.getuserInfo()
  
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

logout(){
  localStorage.removeItem('Token')
  localStorage.removeItem('email')
  localStorage.clear()
  this.router.navigate(['/login'])
}
}
