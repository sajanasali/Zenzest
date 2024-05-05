import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ApiResponse } from 'src/app/Models/appointmentModel';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-shedule-slot',
  templateUrl: './shedule-slot.component.html',
  styleUrls: ['./shedule-slot.component.css'],
})
export class SheduleSlotComponent {
  slotsSub: Subscription | undefined;
  bookesSlotSub: Subscription | undefined;
  sloDataSub: Subscription | undefined;
  slotsForDate: string[] = [];
  timeSlots: string[] = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19.30',
  ];
  timeslotForm: FormGroup = new FormGroup({});
  addedSlotData: { date: string; timeslots: string[] }[] = [];
  selectedButtonIndices: number[] = [];
  datePipe = new DatePipe('en-US');
  minDate!: string;
  maxDate!: string;
  isSlotBooked: boolean[] = [];
  availableSlots: string[] = [];
  selectedDate: string | null = null;
 slotdata:any;
 bookedslot:any;
  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.timeslotForm = fb.group({
      date: ['', Validators.required],
      selectedSlot: [[]],
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

    this.timeslotForm.get('date')?.valueChanges.subscribe(selectedDate => {
      this.onDateChange(selectedDate);
  });
  }

   
  


  changeDateFormat(date: string): string {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit', // Or "numeric" for numeric representation
      day: '2-digit',
    });
    return formatter.format(dateObj);
  }
    
 

  onDateChange(selectedDate:string) {
    console.log("inside the on change")
    //const selectedDate: Date = event.value!;
    const formattedDate = this.changeDateFormat(selectedDate);

    console.log(formattedDate, 'dateeeeeeeeeeeeeee');
    this.slotsSub = this.doctorService.getAvailSlots(formattedDate).subscribe({
      next: (res) => {
      
       this.slotdata=res
       console.log(this.slotdata)
      
           this.addedSlotData.push({ date: formattedDate, timeslots: this.slotdata });
           console.log(60, this.addedSlotData);
           this.updateSelectedButtonIndices(this.slotdata);
      
      },
    });

    //api call to get the slots booked by user

    this.bookesSlotSub =  this.doctorService.getBookedSlots(formattedDate).subscribe({
      next:(res)=>{
        //const data = ((res as ApiResponse).slotsForDate);
        this.bookedslot=res
        console.log(this.bookedslot,"bookeddata")
        this.updateIsSlotBooked(this.bookedslot)
        }
    })
  }
  updateIsSlotBooked(bookedSlots: string[]) {
    this.isSlotBooked = this.timeSlots.map((slot) =>
      bookedSlots.includes(slot)
    );
  }
  updateSelectedButtonIndices(timeslotsdata: any[]) {
    this.selectedButtonIndices = [];
    for (const slot of timeslotsdata) {
      const index = this.timeSlots.indexOf(slot);
      if (index !== -1) {
        this.selectedButtonIndices.push(index);
      }
    }
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
    const existingDate = this.addedSlotData.find(
      (i) => i.date === formattedDate
    );

    if (isSlotSelected) {
      console.log(94, this.addedSlotData);

      // Check if existingDate is defined
      if (existingDate) {
        const newArray = existingDate.timeslots.filter(
          (time) => time !== timeslot
        );
        existingDate.timeslots = newArray;
      }

      this.selectedButtonIndices = this.selectedButtonIndices.filter(
        (times) => times !== index
      );
    } else {
      // Check if existingDate is defined
      if (existingDate) {
        existingDate.timeslots.push(timeslot);
      } else {
        // If the date does not exist, create a new entry
        this.addedSlotData.push({ date: formattedDate, timeslots: [timeslot] });
      }

      this.selectedButtonIndices.push(index);
    }
  }
  onSubmit() {
    // Check if at least one time slot is selected

    if (
      this.addedSlotData.length === 0 ||
      this.addedSlotData.every((data) => data.timeslots.length === 0)
    ) {
      // Show an alert or message to inform the user to select at least one time slot
      Swal.fire('Please select at least one time slot.', 'Close');
      return;
    }

    this.sloDataSub = this.doctorService
      .addTimeSlots(this.addedSlotData)
      .subscribe({
        next: (res) => {
          Swal.fire('SLOTS ADDED SUCCESSFULLY', 'Close');
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    this.timeslotForm.reset();
    this.addedSlotData = [];
  }

  ngOnDestroy() {
    if (this.slotsSub) {
      this.slotsSub.unsubscribe();
    }
    if (this.bookesSlotSub) {
      this.bookesSlotSub.unsubscribe();
    }
    if (this.sloDataSub) {
      this.sloDataSub.unsubscribe();
    }
  }
}
