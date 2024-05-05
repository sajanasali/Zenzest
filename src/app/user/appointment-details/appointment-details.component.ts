import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { appointmentDetails,appointmentResponse } from '../Model/Usermodel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit{
  constructor(private userservice:UserService){}
  datas!:appointmentDetails[];
  data!:appointmentDetails;
  searchText:string='';
  hideButton: boolean = false;
  cancelData:Subscription|undefined;
  Appointmentdata: Subscription | undefined;
  paginatedData: appointmentDetails[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  ngOnInit(): void {
    
      this.getAppointment()

  }
  getAppointment(){
    this.Appointmentdata= this.userservice.getAppointment().subscribe((response:any) => {
      this.datas = response.data;
     //this.doctorDataservice.setDoctors(this.doctors)
     this.paginateData();
      console.log(this.datas,"doctorrrrrrrr")
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

  cancelAppointments(appointment:appointmentDetails) {
    
    
    Swal.fire({
      title: 'Confirmation',
      text: 'Please confirm to cancel the appointment',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform cancel appointment logic
         appointment.status='Cancelled'
        this.cancelData = this.userservice.cancelAppointment([appointment]).subscribe({
          next:(res)=>{
            
            
            console.log(res,"response from cancel appointment")
            this.data= ((res as appointmentResponse).data)
            console.log(this.data,"datasssssssssssssssssssss")
           
            console.log(this.datas)
          },
          error:(err)=>{
            console.error('API request error:', err);
      
          }
        });
      }
    });
  }
  
  ngOnDestroy() {
    if (this.Appointmentdata) {
      this.Appointmentdata.unsubscribe();
    }
    if (this.cancelData) {
      this.cancelData.unsubscribe();
    }
  }
}
