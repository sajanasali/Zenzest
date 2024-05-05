import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup,FormBuilder,Validators,FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ApiResponse } from 'src/app/Models/appointmentModel';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-doctor-shedule',
  templateUrl: './doctor-shedule.component.html',
  styleUrls: ['./doctor-shedule.component.css']
})
export class DoctorSheduleComponent {



  slotsSub: Subscription | undefined;
  bookesSlotSub: Subscription | undefined;
  sloDataSub:Subscription | undefined;
  slotsForDate: string[] = []
  timeSlots: string[] = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19.30'
  ]
  timeslotForm!: FormGroup;
  addedSlotData: { date: string, timeslots: string[] }[] = [];
  selectedButtonIndices: number[] = [];
  datePipe = new DatePipe('en-US');
  minDate!:string
  maxDate!:string
  isSlotBooked: boolean[] = [];
  



  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,private cdr: ChangeDetectorRef
   
    ) {
    this.timeslotForm = fb.group({
      date: ['', Validators.required],
      selectedSlot: [[]]
    });
    
  }



  ngOnInit() {
  
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 1);
     const maxDate = new Date();
     maxDate.setDate(currentDate.getDate() + 30);
   
     this.minDate = this.datePipe.transform(minDate, 'yyyy-MM-dd') || '';
     this.maxDate = this.datePipe.transform(maxDate, 'yyyy-MM-dd') || '';


    
     
   }


   
   changeDateFormat(date: string) {
    debugger;
    const dateobj = new Date(date);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = dateobj.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
    console.log(formattedDate)
    return formattedDate;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    //console.log(selectedDate,"selected date")
    console.log("ondatechange function invokes")
   // const selectedDate!: string = event?.value?.toISOString();
   const selectedDate: Date = event.value!;
    this.selectedButtonIndices = [];
    //const formattedDate = this.changeDateFormat(selectedDate);
   
    //api call to get the selected slots
  //  this.slotsSub =  this.doctorService.getAvailSlots( formattedDate).subscribe({
  //     next: (res) => {
  //       const data = ((res as ApiResponse).slotsForDate)
  //       this.addedSlotData.push({date: formattedDate, timeslots: data})
  //       console.log(60000000000000000000,this.addedSlotData);
  //      this.updateSelectedButtonIndices(data);
  //     },
  //     error: (err) => {
  //       console.log(err.message);

  //     }
  //   })




//api call to get the slots booked by user

// this.bookesSlotSub =  this.doctorService.getBookedSlots(formattedDate).subscribe({
//   next:(res)=>{
//     const data = ((res as ApiResponse).slotsForDate);
//     console.log(data,"data fro bookedslot")
//     this.updateIsSlotBooked(data)
//     }
// })
// }


// updateIsSlotBooked(bookedSlots: string[]) {
// this.isSlotBooked = this.timeSlots.map(slot => bookedSlots.includes(slot));
// }

// updateSelectedButtonIndices(timeslotsdata: any[]) {
// this.selectedButtonIndices = [];
// for (const slot of timeslotsdata) {
//   const index = this.timeSlots.indexOf(slot);
//   if (index !== -1) {
//     this.selectedButtonIndices.push(index);
//     this.cdr.detectChanges();
//   }
// }
 }
 onchange(){

  console.log("helloooooooooo")
 }
handleButton(index: number, timeslot: string) {
    
  const currentDate = this.timeslotForm.get('date')?.value;
  const formattedDate = this.changeDateFormat(currentDate);
  const isSlotSelected = this.selectedButtonIndices.includes(index);
  
  
if (this.isSlotBooked[index]) {
  // Slot is booked, do not allow selection
  return;
}

  // Find the existing date in addedSlotData
  const existingDate = this.addedSlotData.find((i) => i.date === formattedDate);

  if (isSlotSelected) {
    console.log(94,this.addedSlotData);
    
    const abcd = this.addedSlotData.filter((obj)=>obj.date === formattedDate);
    console.log(95,abcd);
    
    const newArray = abcd[0].timeslots.filter(time => time !== timeslot)
    abcd[0].timeslots = newArray
    
    this.selectedButtonIndices = this.selectedButtonIndices.filter(times => times !== index);
  } else {
    // const abcd = this.addedSlotData.filter((obj)=>obj.date === formattedDate);
    // abcd[0].timeslots.push(timeslot)
    this.selectedButtonIndices.push(index);
  }
}


   onSubmit() {
 
   // Check if at least one time slot is selected
if (this.addedSlotData.length === 0 || this.addedSlotData.every(data => data.timeslots.length === 0)) {
  // Show an alert or message to inform the user to select at least one time slot
  Swal.fire('Please select at least one time slot.','Close');
  return;
}
  
this.sloDataSub =  this.doctorService.addTimeSlots( this.addedSlotData).subscribe({
    next: (res) => {
      Swal.fire('SLOTS ADDED SUCCESSFULLY','Close')

    }, error: (err) => {
      console.log(err.message);

    }
  })
  this.timeslotForm.reset();
  this.addedSlotData = [];
}
ngOnDestroy(){
  if(this.slotsSub){
    this.slotsSub.unsubscribe();
  }
  if(this.bookesSlotSub){
    this.bookesSlotSub.unsubscribe();
  }
  if(this.sloDataSub){
    this.sloDataSub.unsubscribe();
  }
}

}


