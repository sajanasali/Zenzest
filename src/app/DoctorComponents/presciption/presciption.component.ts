import { Component } from '@angular/core';
import { FormBuilder,FormArray,Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-presciption',
  templateUrl: './presciption.component.html',
  styleUrls: ['./presciption.component.css']
})
export class PresciptionComponent {

  prescriptionForm!:FormGroup;
  constructor(private fb:FormBuilder,
    
  ){
    
      this.prescriptionForm = fb.group({
        appId: [],
        diagnosis:['',Validators.required],
        medicines: fb.array([]),
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
      
    }
}
