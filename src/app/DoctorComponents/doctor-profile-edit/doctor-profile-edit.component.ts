import { Component } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorModel, profileData, profileResponse, profiledisplay } from 'src/app/DoctorComponents/DoctorModel/doctorModel';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-doctor-profile-edit',
  templateUrl: './doctor-profile-edit.component.html',
  styleUrls: ['./doctor-profile-edit.component.css']
})
export class DoctorProfileEditComponent {


  imageUrl: string | ArrayBuffer | null = null;
 
  profileForm:FormGroup=new FormGroup({})
  selectedFileName: string = '';
  selectedFile: File | null = null;
  Imgsrc:string=''
  data!:profiledisplay;
profileDataSub: Subscription | undefined;
  doctorservice: any;
  constructor( private builder:FormBuilder,private service:DoctorService,private router:Router){}
 ngOnInit(): void {
   

  this.profileForm=this.builder.group({
          
 
    qualification:this.builder.control('',Validators.required),
   education:this.builder.control('',Validators.required),
     
    experience:this.builder.control('',Validators.required),
    certification:this.builder.control('',Validators.required),
   
})
this.getDoctorInfo();
 }
get qualification() {
  return this.profileForm.get('name');
}
get education() {
  return this.profileForm.get('name');
}
get experience() {
  return this.profileForm.get('name');
}
get certification() {
  return this.profileForm.get('name');
}


onFileSelected(event: any) {
  if(event.target.files.length>0){
    debugger
    const file=event.target.files[0] ;
    console.log(file,"file")
    const formData=new FormData()
    formData.append('image',file) 
    console.log("FormData after append:", formData);
   
    
    this.service.Imageupload(formData).subscribe(
      (response)=>{
        console.log('File uploaded successfully:', response);
      }
    )
  }
}

getDoctorInfo(){
  //const doctorId = this.doctorservice.getDoctorId
  //console.log("doctorId",doctorId)
  this.profileDataSub = this.service.getDoctorProfileData().subscribe({
    next:(res)=>{
      console.log(res,"response from profile")
      this.data = ((res as profileResponse).data)
      console.log(this.data)
    },
    error:(err)=>{
      console.error('API request error:', err);

    }
  })
    
}

onSubmitProfile(){
  if(this.profileForm.valid){

  const profData:profileData={
        
        qualification:this.profileForm.value.qualification as string,
        education:this.profileForm.value.education as string,
        experience:this.profileForm.value.experience as string,
        certification:this.profileForm.value.certification as string,
        


  }

// this.service.doctorEditprofile(profData).subscribe(
//   (response)=>{
//     if(response){
//       console.log(response)
//     }else{
//       console.log("updation failed")
//     }
      
//   }
// )
  this.service.doctorEditprofile(profData).subscribe(
    (response)=>{
      if(response){
        console.log("response",response)
        this.router.navigate(['doctor/dashboard/profile']);
      }else{
        console.log("updation failed")
      }
    }
  )
  }
}


}

