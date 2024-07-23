import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dashData } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { DoctorService } from 'src/app/services/doctor/doctor.service';


@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.css']
})
export class MaincomponentComponent implements OnInit {
  constructor(private service:DoctorService){}

subData : Subscription | undefined;
dashboardData: any = {};
totalAppointments:number=0;
monthlyAppointmentsRevenue!:number[];
monthlyAppointments!:number[];
annualRev:number=0;
weeklyRev:number=0;
monthlyRev:number=0;
//labels!:string[];
labels = ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'];
  ngOnInit(): void {
    this.subData = this.service.getDashdata().subscribe({
      next:(res)=>{
        console.log(16,res);
        this.dashboardData = res
        console.log(this.dashboardData,"dashboard data")

        this.totalAppointments = this.dashboardData.user.data.annualTotalAppointments;
        console.log(this.totalAppointments,"total appointmwnnnnn")
        this.annualRev = this.dashboardData.user.data.annualRevenue;
        this.weeklyRev = this.dashboardData.user.data.weeklyRevenue;
        this.monthlyRev = this.dashboardData.user.data.monthlyRevenue;
        // this.labels = this.dashboardData.monthlyAppointments.map((app:any)=>{
        // console.log(app,32);
        // return app.month
        // })
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
  ngOnDestroy(){
    this.subData?.unsubscribe();
  }

}
