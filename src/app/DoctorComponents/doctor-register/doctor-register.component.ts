import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule,Validators ,FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/doctorAuth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Doctors } from '../DoctorModel/doctorModel';
import { beginRegister } from 'src/store/doctor/Doctor.action';
import { showalert } from 'src/store/common/App.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit {


  registerForm:FormGroup=new FormGroup({})
    constructor(private builder:FormBuilder,private store:Store,private doctorservice:AuthService,
      private http:HttpClient,private router:Router){}
      
ngOnInit(){
   this.registerForm=this.builder.group({

         name:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
         email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
         password:this.builder.control('',Validators.required),
         cpassword:this.builder.control('',Validators.required)
    })
    

  } 
  checkFormValidity() {
    console.log("Form Valid:", this.registerForm.valid);
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get cpassword(){
    return this.registerForm.get('cpassword')
  }
 


  ProceedRegister(){
    console.log("first check")
          if(this.registerForm.valid){
            console.log("registration")
            if (this.registerForm.value.password === this.registerForm.value.cpassword) {
              console.log("checking")
              const _userobj: Doctors = {
               name: this.registerForm.value.name as string,
                password: this.registerForm.value.password as string,
                 cpassword:this.registerForm.value.cpassword as string,
                email: this.registerForm.value.email as string,
               }
              console.log(_userobj)
              //this.store.dispatch(beginRegister({ userdata: _userobj }))
        this.doctorservice.DoctorRegisteration(_userobj).subscribe((response)=>{
                  console.log(response,"response from doctor registration")
                  this.router.navigate(['doctor/otp'])
        })
          
            } else {
              // this.store.dispatch(showalert({ message: 'Password mismatch', resulttype: 'fail' }))
              Swal.fire('warning',"password mismatch")
            }

         }


  }




}
