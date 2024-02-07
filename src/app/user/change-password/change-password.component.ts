import { Component, OnInit, inject } from '@angular/core';
import { FormsModule,FormControl,Validators,FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  
 constructor(private builder:FormBuilder,private userservice:UserService,private activateRoute:ActivatedRoute){}

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
      const token=localStorage.getItem('Token')
      console.log(email,token,"useremail")
      if (this.ChangepasswordForm.value.password === this.ChangepasswordForm.value.cpassword) {
  const datas:{}=

        {
          token:this.token,
          email:email,
          password: this.ChangepasswordForm.value.password as string,
        cpassword:this.ChangepasswordForm.value.cpassword as string}
        console.log(datas,"datas ")
      

     this.userservice.updatePassword(datas).subscribe(
      (response) => {
        console.log('Response:', response);
        console.log('email send successfully');
      },
      (error) => {
        console.error('Failed to send OTP:', error);
      }
    
     )
    }
    }
  }
}
