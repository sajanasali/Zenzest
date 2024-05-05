import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { profileResponse, profiledisplay } from 'src/app/user/Model/Usermodel';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development'; 
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  doctorId:string='';
  doctorName:string='';
  doctorDept:string='';
  selectedSlot:string='';
  selectedDate:string='';
  image:string='';
  education:string[]=[];
  fees!:number;
  userId:string='';
  userName:string='';
  userEmail:string='';
  slot:any;
  doctorData:any;
  paymentOption:string='';
  profileDataSub:  Subscription | undefined;
  data!:profiledisplay;
;
 
  constructor(private route:ActivatedRoute,private userService:UserService){
  route.queryParams.subscribe((queryParams=>{
    this.doctorId = queryParams['doctorId'];
    this.doctorName = queryParams['doctorName'];
    this.doctorDept = queryParams['dept'];
    this.education = queryParams['degree'];
    this.image = queryParams['image'];
    this.selectedSlot = queryParams['selectedSlot'];
    this.selectedDate =queryParams['selectedDate'];
    this.fees = queryParams['fees'];
    console.log(this.fees,'fee 29');
  }))
  }

  ngOnInit(){
    this.getUserInfo()
  }
  getUserInfo(){
    //const doctorId = this.doctorservice.getDoctorId
    //console.log("doctorId",doctorId)
    this.profileDataSub = this.userService.getProfileData().subscribe({
      next:(res)=>{
        console.log(res,"response from profile")
        this.data = ((res as profileResponse).data)
        this.userName=this.data.name;
         
        console.log(this.userName)
      },
      error:(err:any)=>{
        console.error('API request error:', err);
  
      }
    })
      
  }
  onConfirmAppointment(){
    this.doctorData={
      doctorId:this.doctorId,
      fullName:this.doctorName,
      fee:this.fees
    }
    this.slot={
      date:this.selectedDate,
      time:this.selectedSlot
    }
    this.userService.postPaymentData(this.doctorData,this.slot).subscribe(
      async (res:any)=>{
        let stripe = await loadStripe(environment.stripe_key);
        stripe?.redirectToCheckout({
          sessionId:res.id
        })
      }
    )
  }
  
  ngOnDestroy() {
    if (this.doctorData) {
      this.doctorData.unsubscribe();
    }
    if (this.profileDataSub) {
      this.profileDataSub.unsubscribe();
    }
  }
  
}
