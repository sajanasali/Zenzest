import { DatePipe } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorModel } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { DoctorDataService } from 'src/app/services/doctorData/doctor-data.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Doctor } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  doctors: Doctor[] = [];
  //doctors:any;
  
  datePipe = new DatePipe('en-US');
  minDate!:string;
  maxDate!:string;
  bookingForm!:FormGroup;
  selectedDate:Date | null =null;
  displayedSlots:string[] = [];

  constructor(
    private doctorDataservice:DoctorDataService,
    private doctorService:DoctorService,
    private router:Router,
    private cdr: ChangeDetectorRef
    ){}
    ngOnInit() {
    //   this.doctorDataservice.doctors$.subscribe((doctor) => {
    //     this.doctors = doctor;
    //     if (this.cdr) {
    //     this.cdr.detectChanges();
    //     }
    //     console.log(this.doctors,"doctorsssssssssssss")
    //   });
    // }
   
    
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate()+30);
    this.minDate = this.datePipe.transform(currentDate,'yyy-MM-dd') || '';
    this.maxDate = this.datePipe.transform(maxDate,'yyyy-MM-dd') || '';
   

  }

  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('/');
    const month = this.getMonthNumber(parts[0]);
    const day = parts[1];
    const year = parts[2];
    return `${month}/${day}/${year}`;
  }
  
  // Function to get the numerical value of the month from its short name
  getMonthNumber(shortMonth: string): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return String(months.findIndex(month => month === shortMonth) + 1).padStart(2, '0');
  }
  availableTimeSlots(){
    if(this.selectedDate){
      const formattedDate = this.datePipe.transform(this.selectedDate, 'MMM/dd/yyyy');
      //const formattedDate =   this.convertDateFormat(this.selectedDate);
      console.log(formattedDate,"formatted dateeeeeeeeeeeeeee")
      const selectedDoctor = this.doctorDataservice.getDoc();
      console.log("selectedDoctor",selectedDoctor)
      const availableSlots = selectedDoctor.slots.find((slot)=>slot.date === formattedDate);
      const selectedDate = new Date(formattedDate!);
const availableSlot = selectedDoctor.slots.find((slot) => {
    const slotDate = new Date(slot.date);
    return slotDate.getTime() === selectedDate.getTime();
});
console.log(availableSlot,"available slotsssss")

      
      console.log("avilable slots",availableSlots)

    if (availableSlot && availableSlot.timeslots.length > 0) {
      // Filter out past time slots if the selected date is today
      if (this.isToday(this.selectedDate)) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
        this.displayedSlots = availableSlot.timeslots.filter((slot) => {
          const [hours, minutes] = slot.split(':').map(Number);
          const slotTime = hours * 60 + minutes; // Convert slot time to minutes
          return slotTime >= currentTime;
        });
      } else {
        this.displayedSlots = availableSlot.timeslots;
      }
         // Sort the displayedSlots array in ascending order
           this.displayedSlots.sort((a, b) => {
          const date = new Date('1970-01-01 ' + a);
          const dateB = new Date('1970-01-01 ' + b);
        
          // Compare the Date objects
          return date.getTime() - dateB.getTime();
        });
    } else {
      this.displayedSlots = [];
    }
  }else {
    this.displayedSlots = [];
  } }

  isToday(selectedDate: Date): boolean {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
    }

    onSlotSelection(selectedSlot:string){
      const selectedDoctor = this.doctorDataservice.getDoc();
      
      const queryParams:any = {
        doctorId: selectedDoctor._id,
        selectedDate: this.datePipe.transform(this.selectedDate, 'MMM dd, yyyy'),
        selectedSlot:selectedSlot,
        doctorName:selectedDoctor.name,
        Qualification:selectedDoctor.qualification,
        Education:selectedDoctor.education,
        image:selectedDoctor.image,
        fees:selectedDoctor.fees
        

      }
      
      this.router.navigate(['dashboard/bookingdetails'],{queryParams:queryParams});
    }
}