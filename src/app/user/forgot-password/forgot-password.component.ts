import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl }  from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { emailResponse } from '../Model/Usermodel';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

constructor(private builder:FormBuilder,private userservice:UserService){}
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
      this.userservice.sendEmail(emailObject).subscribe(
        (response: { [key: string]: any }) => {
          typeof(response)
          console.log('Response:', response['email']);
          console.log('email send successfully');
          localStorage.setItem('email',response['email'])
          //localStorage.setItem('userEmail', userEmail)
        },
        (error) => {
          console.error('Failed to send OTP:', error);
        }
      );
    }


   }



   
}
