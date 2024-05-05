import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeadercomComponent } from './headercom/headercom.component';
import { FootercomComponent } from './footercom/footercom.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

const routes: Routes = [
{path:'headermod',component:HeadercomComponent},
{path:'footermod',component:FootercomComponent},
{path:'usersidebar',component:UserSidebarComponent},
{path:'adminsidebar',component:AdminSidebarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
