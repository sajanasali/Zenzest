import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctors } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { CustomValidationService } from 'src/app/services/customValidationService/custom-validation.service';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createdoctor',
  templateUrl: './createdoctor.component.html',
  styleUrls: ['./createdoctor.component.css']
})
export class CreatedoctorComponent {
   
  
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidationService: CustomValidationService,
    private adminsService:AdminService,
    private router:Router // Inject your custom validation service
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email,this.customValidationService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), this.customValidationService.patternValidator()]], // Apply custom pattern validator
      cpassword: ['', [Validators.required]]
    }, { validator: this.customValidationService.MatchPassword('password', 'cpassword') }); // Apply custom match password validator
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Form is valid, proceed with submission
      const _userobj: Doctors = {
        name: this.registerForm.value.name as string,
         password: this.registerForm.value.password as string,
          cpassword:this.registerForm.value.cpassword as string,
         email: this.registerForm.value.email as string,
        }
       console.log(_userobj)
       //this.store.dispatch(beginRegister({ userdata: _userobj }))
 this.adminsService.createDoctor(_userobj).subscribe((response)=>{
           console.log(response,"response from doctor registration")
           this.router.navigate(['doctor/dashboard'])
 })

    } else {
      // Form is invalid, display validation errors
      this.displayValidationErrors();
    }
  }

  displayValidationErrors() {
    // Loop through form controls to find validation errors
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // Display validation error message using SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: this.getErrorMessage(key, keyError)
          });
        });
      }
    });
  }

  getErrorMessage(controlName: string, errorName: string): string {
    const control = this.registerForm.get(controlName);
    if (control) {
      if (errorName === 'required') {
        return `${controlName} is required.`;
      } else if (errorName === 'minlength') {
        return `${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters long.`;
      } else if (errorName === 'email') {
        return 'Invalid email format.';
      } else if (errorName === 'pattern') {
        return `Invalid ${controlName}.`;
      } else if (errorName === 'passwordMismatch') {
        return 'Passwords do not match.';
      }
    }
    return '';
  }

}
