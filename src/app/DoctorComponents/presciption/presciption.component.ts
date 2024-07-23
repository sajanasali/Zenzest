import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,Validators, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-presciption',
  templateUrl: './presciption.component.html',
  styleUrls: ['./presciption.component.css']
})
export class PresciptionComponent implements OnInit {

  prescriptionForm!:FormGroup;
  subData:Subscription|undefined
  ApplId:string='';
 presdata:boolean=false;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params)=>{
      console.log(params,"paramssssssss")
      this.ApplId=params['id']
      this.initializeForm()
    })
  }
  constructor(private fb:FormBuilder,private doctorService:DoctorService,private router:ActivatedRoute,private routers:Router
    
  ){}
 
  initializeForm(): void {
    this.prescriptionForm = this.fb.group({
       appId: new FormControl(this.ApplId),
       diagnosis:['',Validators.required],
       medicines: this.fb.array([]),
       advice:['',Validators.required],

     });
   }


    get medicines(){
      return this.prescriptionForm.get('medicines') as FormArray;
    }
    get dosage(){
      return ['Once Daily','Twice daily','Thrice daily','Once daily before food',
      'Twice daily before food','Thrice daily before food','Once daily after food',
      'Twice daily after food','Thrice daily after food'];
    }

    addMedicine() {
      this.medicines.push(this.createMedicineGroup());
    }
  
    // Method to remove a medicine group from the FormArray
    removeMedicine(index: number) {
      this.medicines.removeAt(index);
    }
  
    // Method to create a FormGroup for each medicine
    createMedicineGroup() {
      return this.fb.group({
        medicine: ['', Validators.required],
        dosage: ['', Validators.required]
      });
    }
  

    onSubmit(){
      console.log(49,'ok',this.prescriptionForm.value);
      const prescriptionData = this.prescriptionForm.value;
     this.subData =  this.doctorService.addPrescription(this.ApplId,prescriptionData).subscribe({
        next:(res)=>{
          this.doctorService.endPrescription(this.ApplId).subscribe({
            next:(res)=>{
                Swal.fire("Prescription added successfully")
                this.routers.navigate(['doctor/dashboard/appointment'])
            }
          })
         
        
         
        },
        error:(err)=>{
         Swal.fire(err.message)

        }
      })
    }
}
function initializeForm() {
  throw new Error('Function not implemented.');
}

