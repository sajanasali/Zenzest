import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { beginOtpSending } from 'src/store/user/User.action';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private userservice:UserService,private route:ActivatedRoute,private store:Store,private router:Router){}
 email:{}={};
 otpemail:string='';
 display:any;
 resendOtp:boolean=false
 displayTimer:boolean=false
 otp:string='';
 userData: any = {};
 timer:number=60;

 setingTimer:any;
textSec: any = '0';
//Udata=Subscription|unknown
ngOnInit(): void {
    
// this.email=this.userservide.GetdataFromStorage()
// console.log(this.email)
this.route.queryParams.subscribe((params) => {
this.email ={email:params['email']};
this.otpemail=params['email']

  console.log('Email received:', this.email);
});
  
this.sendOtp()
//this.setTimer(1)
this.start(1)

}

// setTimer(minute:any){
//  let  seconds = minute * 60;
//  const prefix = minute < 10 ? '0' : '';
//   this.setingTimer=setInterval(()=>{
//   if(this.timer>0){
//     this.timer--
//   }else{
//    this.timer=59
//   }
//   })
//   }

start(minute:any) {
  this.displayTimer = true;
  this.resendOtp = false;
  // let minute = 1;
  let seconds = minute * 60;
  let textSec: any = '0';
  let statSec = 60;

  const prefix = minute < 10 ? '0' : '';

  const timer = setInterval(() => {
    seconds--;
    if (statSec != 0) statSec--;
    else statSec = 59;

    

    if (statSec < 10) {
      
      textSec = '0' + statSec;
    } else {
      
      textSec = statSec;
    }

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

    if (seconds == 0) {
     
      clearInterval(timer);
      this.resendOtp = true;
      this.sendOtp()
      this.displayTimer = false;
    }
  }, 1000);
}

sendOtp() {

  console.log('Sending OTP for email:', this.email);
  // Call the sendOtp method from the service
  this.userservice.sendOtp(this.email).subscribe(
    (response) => {
      console.log("response",response)
     
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


// ngOnDestroy(){
//   if(this.Udata){
//     this.Udata.unsubscribe();
//   }
// }
}




