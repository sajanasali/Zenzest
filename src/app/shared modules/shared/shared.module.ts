import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FootercomComponent } from './footercom/footercom.component';
import { HeadercomComponent } from './headercom/headercom.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

import { VideocallComponent } from './videocall/videocall.component';

import { MatIconModule } from '@angular/material/icon';
import { CouncellorsComponent } from './councellors/councellors.component';
import { UservideocallComponent } from './uservideocall/uservideocall.component';
import { ChartsComponent } from './charts/charts.component';


@NgModule({
  declarations: [
    
  
    FootercomComponent,
            HeadercomComponent,
            SidebarComponent,
            UserSidebarComponent,
            AdminSidebarComponent,
         
            VideocallComponent,
            CouncellorsComponent,
            UservideocallComponent,
            ChartsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
   
    MatIconModule 
  ],
  exports:[
    HeadercomComponent,
    FootercomComponent,
    SidebarComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
    CouncellorsComponent
  ]
})
export class SharedModule { }
