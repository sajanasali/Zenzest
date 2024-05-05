import { Component } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { environment } from 'src/environments/environment.development';
import { UserModel, profileData, profileResponse, profiledisplay } from '../Model/Usermodel';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  
  data!:profiledisplay;
  profileDataSub: Subscription | undefined;
  constructor( private service:UserService){}
 
 
 
  
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
}



