import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { SheduleSlotComponent } from './dashboard/shedule-slot/shedule-slot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from 'src/app/DoctorComponents/appointments/appointments.component';
import { PatientsTodayComponent } from './patients-today/patients-today.component';
import { PresciptionComponent } from 'src/app/DoctorComponents/presciption/presciption.component';
import { VideocallComponent } from 'src/app/shared modules/shared/videocall/videocall.component';


const routes: Routes = [
  
  
  {path:'dashboard',component:DashboardComponent,
children:[
  {path:'appointment',component:AppointmentsComponent},
  {path:'appointment',component:AppointmentsComponent},
  {path:'schedule',component:SheduleSlotComponent},
  {path:'profile',component:ProfileComponent},
  {path:'patientsToday',component:PatientsTodayComponent},
  {path:'prescription',component:PresciptionComponent},
 

  
]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
