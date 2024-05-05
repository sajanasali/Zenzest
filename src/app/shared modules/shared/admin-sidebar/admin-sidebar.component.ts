import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
 constructor(private router:Router){}



  logout(){
    localStorage.removeItem('adminToken')
    localStorage.removeItem('email')
    localStorage.clear()
    this.router.navigate(['admin/login'])
  }
}
