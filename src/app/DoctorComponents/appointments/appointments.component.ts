import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { appointmentDetails } from 'src/app/user/Model/Usermodel';
import { StatusRes, response } from '../DoctorModel/doctorModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SocketServiceService } from 'src/app/services/SocketService/socket-service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  datas!:appointmentDetails[];
  searchText:string=''
  paginatedData: appointmentDetails[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  constructor(private doctorservice:DoctorService,private router:Router,private socketService:SocketServiceService){}
  Appointmentdata: Subscription | undefined;
  ConfirmData:Subscription|undefined
  CancelData:Subscription|undefined
  ngOnInit(): void {
    this.getAppointments()

  
  }

  getAppointments(){
    this.Appointmentdata= this.doctorservice.getAppointments().subscribe((response:any) => {
      this.datas = response.data;
     //this.doctorDataservice.setDoctors(this.doctors)
     this.paginateData();
      console.log(this.datas,"appointment dataaa")
    });

  }

  paginateData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);
    console.log(this.paginatedData)
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.paginateData();
  }

 handleButtonClick(data:appointmentDetails){
   if(data.status==='Confirmed'){
      this.startVideoCall(data)
   }else if(data.status==='Completed'){
    this.Prescription(data)
   }else{
    this.ConfirmAppointment(data._id)
   }
 }
  ConfirmAppointment(id:string){
    console.log(id,"confirmid")
       this.ConfirmData=this.doctorservice.ConfirmAppointment(id).subscribe((res:any)=>{
         const response=(res as response).message
         this.getAppointments();
        Swal.fire("Appoinment confirmed")
       }),((error:any)=>{
            console.error("Error",error)
       })
  }
  cancelAppointment(id:string){
    console.log(62, id);
    Swal.fire({
      title: 'Confirmation',
      text: 'Please confirm to cancel the appointment',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CancelData = this.doctorservice.CancelAppointment(id).subscribe({
          next: (res: any) => {
            this.getAppointments();
           Swal.fire("Appointment has been cancelled")
          }, error: (err: any) => {
            Swal.fire('Error occuring while cancelling');
          }
        })
      }
    })
  }

  startVideoCall(app:appointmentDetails){
    this.doctorservice.getAppStatus(app._id).subscribe({
      next:(res)=>{
        const statusData = ((res as StatusRes).status);
        
        if (statusData === 'Cancelled') {
          // If the appointment is cancelled, do not proceed with the video call.
          console.log('Appointment is cancelled. Cannot start the call.');
         Swal.fire('Appointment is cancelled. Cannot start the call.');
          return;
        }else{
          console.log('working here',statusData);
          const room = app._id + app.userId._id;
          const email = app.doctorId.email;
          console.log(119, room);
          this.socketService.joinRoom({ email, room });
          console.log(128, room)
          this.router.navigate([`doctor/call/${room}`], { state: { value: 'doctor', appointmentId: app._id } });
      
        }
        }
  })
  }
  Prescription(data:appointmentDetails){
       this.router.navigate(['/prescription'],{
        queryParams:{
          id:data._id,
          userId:data.userId
        }
       }) 
  }
  ngOnDestroy(){
      if(this.Appointmentdata){
        this.Appointmentdata.unsubscribe()
      }
  }
}
