import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { beginOtpSending } from 'src/store/user/User.action';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private userservice:UserService,private route:ActivatedRoute,private store:Store,private router:Router){}
 email:{}={};
 otpemail:string='';
 otp:string='';
 userData: any = {};
 

ngOnInit(): void {
    
// this.email=this.userservide.GetdataFromStorage()
// console.log(this.email)
this.route.queryParams.subscribe((params) => {
this.email ={email:params['email']};
this.otpemail=params['email']

  console.log('Email received:', this.email);
});
  
this.sendOtp()


}

sendOtp() {

  console.log('Sending OTP for email:', this.email);
  // Call the sendOtp method from the service
  this.userservice.sendOtp(this.email).subscribe(
    (response) => {
      console.log("response",response)
      console.log('OTP sent successfully');
    },
    (error) => {
      console.error('Failed to send OTP:', error);
    }
  );
}

verifyOTP(){
 this.userData={
    email:this.otpemail,
    otp:this.otp
   }
  console.log(this.userData)
  this.userservice.verifyOtp(this.userData).subscribe(
    (response)=>{
      console.log(response)
      if (response.success) {
        // Redirect to a success page or perform other actions
        this.router.navigate(['/login']);
      } else {
        // Display an error message or handle the unsuccessful verification
        console.error('OTP verification failed');
      }
    }
  )
}

}




