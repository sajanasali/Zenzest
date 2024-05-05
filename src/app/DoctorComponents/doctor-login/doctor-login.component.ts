import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AuthService } from 'src/app/services/doctorAuth/auth.service';
import { loginInfo } from '../DoctorModel/doctorModel'
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent  implements OnInit{
    

  imgUrl:string="/assets/doctor.jpg"
  loginForm:FormGroup=new FormGroup({})
  constructor(private builder:FormBuilder,private Service:AuthService,private router:Router ){}
  
  data:[]=[]
  ngOnInit(){
    this.loginForm=this.builder.group({
           email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
          password:this.builder.control('',Validators.required),
         
         
     })
 
   }
   get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

   Proceedlogin() {
    if (this.loginForm.valid) {
      const _obj:  loginInfo= {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      this.Service.loginUser(_obj).subscribe(

        (response: { [key: string]: any })=>{
         
          if (response) {
               
            console.log(response['token'],"response")
            console.log(response['role'],"response role")
            
           localStorage.setItem('doctorToken',response['token'])
            // Redirect to a success page or perform other actions
            this.router.navigate(['doctor/dashboard']);
          } else {
            // Display an error message or handle the unsuccessful verification
            console.error('login failed');
            Swal.fire("your password and email not matched")
          }
        }
      )
     
    }
  }
}
