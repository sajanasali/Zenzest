import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminath/admin.service';
import { loginInfo } from '../AdminModel/adminModel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm:FormGroup=new FormGroup({})
  constructor(private builder:FormBuilder,private Service:AdminService,private router:Router ){}
  
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
      this.Service.loginAdmin(_obj).subscribe(

        (response: { [key: string]: any })=>{
         
          if (response) {
               
            console.log(response['token'],"response")
            console.log(response['role'],"response role")
            
           localStorage.setItem('adminToken',response['token'])
            // Redirect to a success page or perform other actions
            this.router.navigate(['admin/dashboard']);
          } else {
            // Display an error message or handle the unsuccessful verification
            console.error('login failed');
               Swal.fire("password and Email is not matched")
          }
        }
      )
     
    }
  }
}
