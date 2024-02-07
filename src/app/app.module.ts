import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
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
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([UserEffect]),
    HttpClientModule,
    StoreModule.forRoot({}),
  
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthinterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
