import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Users } from '../Model/Usermodel';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { beginRegister,BEGIN_REGISTER } from 'src/store/user/User.action';
import { showalert } from 'src/store/common/App.action';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imgUrl:string="/assets/doctor.jpg";
  registerForm:FormGroup=new FormGroup({})
    constructor(private builder:FormBuilder,private store:Store,private userservice:UserService,
      private http:HttpClient,private router:Router){}
      
ngOnInit(){
   this.registerForm=this.builder.group({

         name:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
         email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
         password:this.builder.control('',Validators.required),
         cpassword:this.builder.control('',Validators.required)
    })
    

  } 
   
 
  
    ProceedRegister(){
      console.log("first check")
            if(this.registerForm.valid){
              console.log("registration")
              if (this.registerForm.value.password === this.registerForm.value.cpassword) {
                console.log("checking")
                const _userobj: Users = {
                 name: this.registerForm.value.name as string,
                  password: this.registerForm.value.password as string,
                   cpassword:this.registerForm.value.cpassword as string,
                  email: this.registerForm.value.email as string,
                 }
                console.log(_userobj)
                this.store.dispatch(beginRegister({ userdata: _userobj }))
         
            
              } else {
                this.store.dispatch(showalert({ message: 'Password mismatch', resulttype: 'fail' }))
              }

           }


    }

  
    
    }
  
