import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctor, DoctorModel } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
@Injectable({
  providedIn: 'root'
})
export class DoctorDataService {
  selectedDoctor!:Doctor;

  constructor() { }


  setDoc(doctor:Doctor){
    this.selectedDoctor=doctor;
  }
  getDoc(){
    return this.selectedDoctor
  }
  // }
}
