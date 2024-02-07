import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { loginInfo } from '../Model/Usermodel';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imgUrl:string="/assets/doctor.jpg"
  loginForm:FormGroup=new FormGroup({})
  constructor(private builder:FormBuilder,private userService:UserService,private router:Router ){}
  
  data:[]=[]
  ngOnInit(){
    this.loginForm=this.builder.group({
           email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
          password:this.builder.control('',Validators.required)
         
     })
 
   }


   Proceedlogin() {
    if (this.loginForm.valid) {
      const _obj:  loginInfo= {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      this.userService.loginUser(_obj).subscribe(

        (response: { [key: string]: any })=>{
         
          if (response) {
               
            console.log(response['token'],"response")
            
           localStorage.setItem('Token',response['token'])
            // Redirect to a success page or perform other actions
            this.router.navigate(['/medicalHostory']);
          } else {
            // Display an error message or handle the unsuccessful verification
            console.error('login failed');
          }
        }
      )
     
    }
  }
}
