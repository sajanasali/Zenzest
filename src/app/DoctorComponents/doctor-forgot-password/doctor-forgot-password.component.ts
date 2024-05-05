import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl }  from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/doctorAuth/auth.service';
import { emailResponse } from '../DoctorModel/doctorModel'
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-doctor-forgot-password',
  templateUrl: './doctor-forgot-password.component.html',
  styleUrls: ['./doctor-forgot-password.component.css']
})
export class DoctorForgotPasswordComponent implements OnInit  {

  constructor(private builder:FormBuilder,private service:AuthService){}
  FpasswordForm:FormGroup=new FormGroup({})


  ngOnInit(){
    this.FpasswordForm=this.builder.group({
           email:this.builder.control('',Validators.compose([Validators.required,Validators.email]))
          
     })
 
   }

   Proceedsubmit(){


    if (this.FpasswordForm.valid) {
      const email = this.FpasswordForm.value.email as string;
  
      // Create an object with the email property
      const emailObject = { email: email };
  
      // Send the email object as the body
      this.service.sendEmail(emailObject).subscribe(
        (response: { [key: string]: any }) => {
          typeof(response)
        
          console.log('Response:', response['email']);
          console.log('email send successfully');
          localStorage.setItem('email',response['email'])
         
        },
        (error) => {
          console.error('Failed to send OTP:', error);
        }
      );
    }


   }



}
