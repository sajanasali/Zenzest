import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { appointmentDetails } from 'src/app/user/Model/Usermodel';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent {
  datas!:appointmentDetails[];
  searchText:string='';
  paginatedData: appointmentDetails[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  constructor(private doctorservice:DoctorService,private adminservice:AdminService){}
  Appointmentdata: Subscription | undefined;
  ngOnInit(): void {
    this.getAppointments()

  
  }

  getAppointments(){
    this.Appointmentdata= this.adminservice.getAppointments().subscribe((response:any) => {
      this.datas = response.data;
     //this.doctorDataservice.setDoctors(this.doctors)
     
      console.log(this.datas,"appointment dataaa")
      console.log(this.datas[0].userId.name,"appointment dataaa",this.datas[0].slotBooked)
      this.paginateData();
    });

  }


  paginateData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.paginateData();
  }
}
