import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-doctorslist',
  templateUrl: './doctorslist.component.html',
  styleUrls: ['./doctorslist.component.css']
})
export class DoctorslistComponent {
  searchText:string='';
  doctors:Doctor[]=[]
  constructor( private doctorservice:DoctorService,private router:Router,private adminservice:AdminService){}

  ngOnInit(): void {
    
  
    this.getDoctor();
  
  }
   
  getDoctor(): void {
    this.doctorservice.getDoctors()
      .subscribe((response:any) => {
        this.doctors = response.data;
       //this.doctorDataservice.setDoctors(this.doctors)
     
        console.log(this.doctors,"doctorrrrrrrr")
      });
  }
  toggleBlockStatus(doctor: Doctor): void {
    doctor.isBlocked = !doctor.isBlocked; // Toggle the isBlocked status
   const  doctorId=doctor._id
    this.adminservice.blockDoctor(doctorId)
      .subscribe({
        next: () => {
          console.log('Doctor block status updated successfully');
          // You may want to reload the list of doctors after updating
          this.getDoctor();
        },
        error: (error) => {
          console.error('Error updating doctor block status:', error);
          // Handle error, e.g., show error message
        }
      });
  }

}
