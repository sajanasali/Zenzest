import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FootercomComponent } from './footercom/footercom.component';
import { HeadercomComponent } from './headercom/headercom.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { CounsellorsComponent } from './counsellors/counsellors.component';
import { VideocallComponent } from './videocall/videocall.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    
  
    FootercomComponent,
            HeadercomComponent,
            SidebarComponent,
            UserSidebarComponent,
            AdminSidebarComponent,
            CounsellorsComponent,
            VideocallComponent
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
    AdminSidebarComponent
  ]
})
export class SharedModule { }
