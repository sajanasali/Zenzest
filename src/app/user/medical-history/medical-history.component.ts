import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel ,medicHistoary, profileResponse, profiledisplay} from '../Model/Usermodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent {
  data!:profiledisplay;
  Udata: Subscription | undefined;
  profileDataSub: Subscription | undefined;
  constructor(private builder:FormBuilder,private userservice:UserService,
    private http:HttpClient,private router:Router){}
 medicalForm:FormGroup=new FormGroup({})


  ngOnInit(){
    this.medicalForm=this.builder.group({
 
          
       
      
        gender:this.builder.control('',Validators.required),
        address:this.builder.control('',Validators.required) ,
       reason:this.builder.control('',Validators.required),
       height:this.builder.control('',Validators.required),
       weight:this.builder.control('',Validators.required),
       blood:this.builder.control('',Validators.required),
       allergies:this.builder.control('',Validators.required)
       
      

     })
     this.getuserInfo();
 
   } 

   getuserInfo(){
    this.profileDataSub = this.userservice.getProfileData().subscribe({
      next:(res)=>{
        console.log(res,"response from profile")
        this.data = ((res as profileResponse).data)
        console.log(this.data)
        this.medicalForm.patchValue({
          gender: this.data.gender,
          address: this.data.address,
          reason: '', // Initialize empty, as it's not available in profiledisplay
          height: this.data.height,
          weight: this.data.weight,
          blood: this.data.bloodgroup,
          allergies: this.data.allergies
        });
      },
      
      error:(err:any)=>{
        console.error('API request error:', err);
  
      }
    })
   }
   onsubmitMedic(){
    
    //if (this.medicalForm.valid) {
      
     const Meddata:medicHistoary={
     
      
      gender:this.medicalForm.value.gender as string,
      address:this.medicalForm.value.address as string,
      reason:this.medicalForm.value.reason as string,
      height:this.medicalForm.value.height as number,
      weight:this.medicalForm.value.weight as number,
      blood:this.medicalForm.value.blood as string,
      allergies:this.medicalForm.value.allergies as string
     



     }
     console.log("medicaldate",Meddata)
  this.Udata=this.userservice.medicalHistory(Meddata).subscribe(
    (response)=>{
         console.log(response)
         this.router.navigate(['dashboard/profile']);
    }
  )

    

}
ngOnDestroy(){
  if(this.Udata){
    this.Udata.unsubscribe();
  }
}
}