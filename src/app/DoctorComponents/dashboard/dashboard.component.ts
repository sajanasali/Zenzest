import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
constructor(private doctorService:DoctorService){}

  subData : Subscription | undefined;
  dashboardData: any = {};
  totalAppointments:number=0;
  monthlyAppointmentsRevenue!:number[];
  monthlyAppointments!:number[];
  annualRev:number=0;
  weeklyRev:number=0;
  monthlyRev:number=0;
  labels!:string[];

  ngOnInit(){
    const doctorId = this.doctorService.getDoctorId();
    this.subData = this.doctorService.getDashdata().subscribe({
      next:(res)=>{
        console.log(16,res);
        this.dashboardData = res;
        this.totalAppointments = this.dashboardData.annualTotalAppointments;
        this.annualRev = this.dashboardData.annualRevenue;
        this.weeklyRev = this.dashboardData.weeklyRevenue;
        this.monthlyRev = this.dashboardData.monthlyRevenue;
        this.labels = this.dashboardData.monthlyAppointments.map((app:any)=>{
        console.log(app,32);
        return app.month
        })
        console.log(this.labels,34);
        
        this.monthlyAppointmentsRevenue = this.dashboardData.monthlyAppointments.map((app:any)=>{
          return app.totalAmount;
        })
        console.log(this.monthlyAppointmentsRevenue,39);
        this.monthlyAppointments = this.dashboardData.monthlyAppointments.map((app:any)=>{
          return app.noOfAppointments;
        })
      },
      error:(err)=>{
        console.log(20,err.message);
       }
    })
  }
}
