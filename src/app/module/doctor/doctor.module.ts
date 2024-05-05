import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SheduleSlotComponent } from './dashboard/shedule-slot/shedule-slot.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared modules/shared/shared.module';
import { PatientsTodayComponent } from './patients-today/patients-today.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    DashboardComponent,
    SheduleSlotComponent,
    PatientsTodayComponent,
   
    
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DoctorModule { }
