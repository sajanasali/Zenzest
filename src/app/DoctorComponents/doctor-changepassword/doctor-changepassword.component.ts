import { Component, OnInit, inject } from '@angular/core';
import { FormsModule,FormControl,Validators,FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/doctorAuth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-changepassword',
  templateUrl: './doctor-changepassword.component.html',
  styleUrls: ['./doctor-changepassword.component.css']
})
export class DoctorChangepasswordComponent implements OnInit {
  constructor(private builder:FormBuilder,private service:AuthService,private activateRoute:ActivatedRoute,private router:Router){}

  ChangepasswordForm:FormGroup=new FormGroup({})
  token!:string;
  email!:string;
   ngOnInit(): void {
      
     this.ChangepasswordForm=this.builder.group({
       password:this.builder.control('',Validators.required),
          cpassword:this.builder.control('',Validators.required)
      
 })
   
 //const emailUser=localStorage.getItem('email')
  
   this.activateRoute.params.subscribe(val=>{
         this.token=val['token']
       
         console.log(this.token)
        
   })
   }
   reset(){
     if(this.ChangepasswordForm.valid){
       const email = localStorage.getItem('email')
       const token=this.token
      
       if (this.ChangepasswordForm.value.password === this.ChangepasswordForm.value.cpassword) {
   const datas:{}=
 
         {
           token:this.token,
           
           password: this.ChangepasswordForm.value.password as string,
         cpassword:this.ChangepasswordForm.value.cpassword as string}
         console.log(datas,"datas ")
       
 
      this.service.updatePassword(datas).subscribe(
       (response) => {
         console.log('Response:', response);
         console.log('password updated successfully');
         this.router.navigate(['doctor/login']);
       },
       (error) => {
         console.error('Failed to store password:', error);
       }
     
      )
     }
     }
   }

}
