import { Component, OnInit, inject } from '@angular/core';
import { FormsModule,FormControl,Validators,FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  
 constructor(private builder:FormBuilder,private userservice:UserService,private activateRoute:ActivatedRoute,private router:Router){}

 ChangepasswordForm:FormGroup=new FormGroup({})
 token!:string;
 email!:string;
 Udata: Subscription | undefined;
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
      

    this.Udata= this.userservice.updatePassword(datas).subscribe(
      (response) => {
        console.log('Response:', response);
        console.log('password updated successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Failed to store password:', error);
      }
    
     )
    }
    }

  }
  ngOnDestroy(){
    if(this.Udata){
      this.Udata.unsubscribe();
    }
  }
}
