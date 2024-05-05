import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEffect } from 'src/store/user/User.Effects';
import { HomeComponent } from './user/home/home.component';
import { StoreModule } from '@ngrx/store';
import { OtpComponent } from './user/otp/otp.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AuthinterceptorInterceptor } from './services/authinterceptor.interceptor';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { MedicalHistoryComponent } from './user/medical-history/medical-history.component';
import { DoctorChangepasswordComponent } from './DoctorComponents/doctor-changepassword/doctor-changepassword.component';
import { DoctorForgotPasswordComponent } from './DoctorComponents/doctor-forgot-password/doctor-forgot-password.component';
import { DoctorLoginComponent } from './DoctorComponents/doctor-login/doctor-login.component';
import { DoctorOtpComponent } from './DoctorComponents/doctor-otp/doctor-otp.component';
import { DoctorRegisterComponent } from './DoctorComponents/doctor-register/doctor-register.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { DoctorProfileEditComponent } from './DoctorComponents/doctor-profile-edit/doctor-profile-edit.component';
import { DoctorSheduleComponent } from './DoctorComponents/doctor-shedule/doctor-shedule.component';
import { AppointmentpageComponent } from './user/appointmentpage/appointmentpage.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ProfileComponent } from './user/profile/profile.component';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from './shared modules/shared/shared.module';
import { BookingComponent } from './user/appointmentpage/booking/booking.component';
import { BookingDetailsComponent } from './user/appointmentpage/booking/booking-details/booking-details.component';
import { DoctorDataService } from './services/doctorData/doctor-data.service';
import { MatIconModule } from '@angular/material/icon';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { DoctorslistComponent } from './admin/doctorslist/doctorslist.component';
import { UserslistComponent } from './admin/userslist/userslist.component';
import { BookinglistComponent } from './admin/bookinglist/bookinglist.component';
import { PaymentsComponent } from './admin/payments/payments.component';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { SucessPageComponent } from './user/appointmentpage/booking/booking-details/sucess-page/sucess-page.component';
import { PaymentFailedComponent } from './user/appointmentpage/booking/booking-details/payment-failed/payment-failed.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AppointmentDetailsComponent } from './user/appointment-details/appointment-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppointmentsComponent } from './DoctorComponents/appointments/appointments.component';
import { CreatedoctorComponent } from './admin/createdoctor/createdoctor.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { UserAuthService } from './services/userAuth/user-auth.service';
import { authUserGuard } from './Auth/Auth/auth-user.guard';
import { ErrorInterceptor } from './Auth/Auth/ErrorInterceptor/error.interceptor';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { BlockedPageComponent } from './common/blocked-page/blocked-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PresciptionComponent } from './DoctorComponents/presciption/presciption.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OtpComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    MedicalHistoryComponent,

    DoctorChangepasswordComponent,
    DoctorRegisterComponent,
    DoctorForgotPasswordComponent,
    DoctorLoginComponent,
    DoctorOtpComponent,

    DoctorProfileEditComponent,
    DoctorSheduleComponent,
    AppointmentpageComponent,
    ProfileComponent,
   
    BookingComponent,
    BookingDetailsComponent,
    AdmindashboardComponent,
    DoctorslistComponent,
    UserslistComponent,
    BookinglistComponent,
    PaymentsComponent,
    MedicineComponent,
    SucessPageComponent,
    PaymentFailedComponent,
    AdminLoginComponent,
    AppointmentDetailsComponent,
    AppointmentsComponent,
    CreatedoctorComponent,
    CreateUserComponent,
    PageNotFoundComponent,
    BlockedPageComponent,
    PresciptionComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([UserEffect]),
    HttpClientModule,
    StoreModule.forRoot({}),
    SharedModule,
    MatCardModule,
    BrowserAnimationsModule,
    FileUploadModule,
    RouterModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatRippleModule,
   
   
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorInterceptor,
      multi: true,
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    },
    DoctorDataService,UserAuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
