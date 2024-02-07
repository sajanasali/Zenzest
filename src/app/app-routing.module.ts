import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { OtpComponent } from './user/otp/otp.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { MedicalHistoryComponent } from './user/medical-history/medical-history.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'otpverification',component:OtpComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'changePassword/:token',component:ChangePasswordComponent},
  {path:'medicalHostory',component:MedicalHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
