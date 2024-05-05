import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { loginInfo } from '../Model/Usermodel';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imgUrl: string = '/assets/doctor.jpg';
  loginForm: FormGroup = new FormGroup({});
  Udata: Subscription | undefined;
  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  data: [] = [];
  ngOnInit() {
    this.loginForm = this.builder.group({
      email: this.builder.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: this.builder.control('', Validators.required),
    });
  }


  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  Proceedlogin() {
    if (this.loginForm.valid) {
      const _obj: loginInfo = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
      this.Udata = this.userService
        .loginUser(_obj)
        .subscribe((response: { [key: string]: any }) => {
          if (response) {
            console.log(response['token'], 'response');
            console.log(response['role'], 'response role');

            localStorage.setItem('Token', response['token']);
            // Redirect to a success page or perform other actions
            this.router.navigate(['dashboard/appointmentpage']);
          } else {
            // Display an error message or handle the unsuccessful verification
            console.error('login failed');
            Swal.fire("your password  and email is not matching")
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.Udata) {
      this.Udata.unsubscribe();
    }
  }
}
