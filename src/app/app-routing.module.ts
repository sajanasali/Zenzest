import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { OtpComponent } from './user/otp/otp.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { MedicalHistoryComponent } from './user/medical-history/medical-history.component';

import { DoctorRegisterComponent } from './DoctorComponents/doctor-register/doctor-register.component';
import { DoctorLoginComponent } from './DoctorComponents/doctor-login/doctor-login.component';
import { DoctorOtpComponent } from './DoctorComponents/doctor-otp/doctor-otp.component';
import { DoctorForgotPasswordComponent } from './DoctorComponents/doctor-forgot-password/doctor-forgot-password.component';
import { DoctorChangepasswordComponent } from './DoctorComponents/doctor-changepassword/doctor-changepassword.component';
import { DoctorModule } from './module/doctor/doctor.module';
import { DoctorProfileEditComponent } from './DoctorComponents/doctor-profile-edit/doctor-profile-edit.component';
import { AppointmentpageComponent } from './user/appointmentpage/appointmentpage.component';
import { DoctorSheduleComponent } from './DoctorComponents/doctor-shedule/doctor-shedule.component';
import { ProfileComponent } from './user/profile/profile.component';

import { BookingComponent } from './user/appointmentpage/booking/booking.component';
import { BookingDetailsComponent } from './user/appointmentpage/booking/booking-details/booking-details.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { DoctorslistComponent } from './admin/doctorslist/doctorslist.component';
import { UserslistComponent } from './admin/userslist/userslist.component';
import { SucessPageComponent } from './user/appointmentpage/booking/booking-details/sucess-page/sucess-page.component';
import { PaymentFailedComponent } from './user/appointmentpage/booking/booking-details/payment-failed/payment-failed.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AppointmentDetailsComponent } from './user/appointment-details/appointment-details.component';
import { AppointmentsComponent } from './DoctorComponents/appointments/appointments.component';
import { BookinglistComponent } from './admin/bookinglist/bookinglist.component';
import { CreatedoctorComponent } from './admin/createdoctor/createdoctor.component';
import { authUserGuard } from './Auth/Auth/auth-user.guard';
import { authAdminGuard } from './Auth/Auth/auth-admin.guard';
import { authDoctorGuard } from './Auth/Auth/auth-doctor.guard';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { BlockedPageComponent } from './common/blocked-page/blocked-page.component';
import { PresciptionComponent } from './DoctorComponents/presciption/presciption.component';
import { VideocallComponent } from './shared modules/shared/videocall/videocall.component';


const routes: Routes = [
  
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'otpverification',component:OtpComponent },
  {path:'blocked',component:BlockedPageComponent},
  {path:'call/:room',component:VideocallComponent},
 
  
  {path:'dashboard',component:DashboardComponent,
  canActivate:[authUserGuard],
  
  children:[
    
    {path:'profile',component:ProfileComponent}
, 
    {path:'medicalHistory',component:MedicalHistoryComponent},
 
    {path:'booking',component:BookingComponent},
    {path:'appointmentpage',component:AppointmentpageComponent},
    {path:'appointmentDetails',component:AppointmentDetailsComponent},
    {path:'bookingdetails',component:BookingDetailsComponent},
    {path:'bookingSuccess',component:SucessPageComponent},
  {path:'bookingfailed',component:PaymentFailedComponent},
  
  ]},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'changePassword/:token',component:ChangePasswordComponent},
  
  {path:'doctor/register',component:DoctorRegisterComponent},
  {path:'doctor/login',component:DoctorLoginComponent},
  {path:'doctor/otp',component:DoctorOtpComponent},
  {path:'doctor/forgotPassword',component:DoctorForgotPasswordComponent},
  {path:'doctor/changePassword',component:DoctorChangepasswordComponent},
  {path:'doctor/profileEdit',component:DoctorProfileEditComponent},
 
 
  
 // {path:'admin/doctorlist',component:DoctorslistComponent},
  
  {path:'admin/createDoctor',component:CreatedoctorComponent},
  { path: 'doctor/login/doctor/forgotPassword', redirectTo: 'doctor/forgotPassword', pathMatch: 'full' },
  { path: 'doctor/login/doctor/register', redirectTo: 'doctor/register', pathMatch: 'full' },
  {path:'doctor/dashboard/doctor/profile',redirectTo:'doctor/profile',pathMatch:'full'},
  {path:'doctor/profile/doctor/profileEdit',redirectTo:'doctor/profileEdit',pathMatch:'full'},
  {path:'doctor/dashboard/doctor/schedule',redirectTo:'doctor/schedule',pathMatch:'full'},
  {path:'doctor/profile/doctor/dashboard',redirectTo:'doctor/dashboard',pathMatch:'full'},
  {path:'doctor/schedule/doctor/appointments',redirectTo:'doctor/appointments',pathMatch:'full'},
  {path:'doctor/appointments/doctor/schedule',redirectTo:'doctor/schedule',pathMatch:'full'},
  {path:'doctor/register/doctor/login',redirectTo:'doctor/login',pathMatch:'full'},
  { path: 'login/register', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register/login', redirectTo: 'login', pathMatch: 'full' },
  {path:'doctor/dashboard/profile/doctor/profileEdit',redirectTo:'doctor/profileEdit',pathMatch:'full'},
  {path:'dashboard/profile/medicalHistory',redirectTo:'medicalHistory'},
 {path:'doctor/call/:room',component:VideocallComponent},
  
  
  {path:'admin/login',component:AdminLoginComponent},
  

 
  {path:'doctor',loadChildren:()=>import('./module/doctor/doctor.module').then (m=>m.DoctorModule),
  canActivate:[authDoctorGuard] },
   {path:'admin/dashboard',component:AdmindashboardComponent,canActivate:[authAdminGuard],
         children:[
          {path:'doctorlist',component:DoctorslistComponent},
          {path:'userslist',component:UserslistComponent},
          {path:'bookings',component:BookinglistComponent},
         ]
  }
  
     
                   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
