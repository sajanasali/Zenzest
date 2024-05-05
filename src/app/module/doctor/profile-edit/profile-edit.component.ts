import { Component, OnInit } from '@angular/core';
import { FormsModule,FormControl, ReactiveFormsModule,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorModel, profileData } from 'src/app/DoctorComponents/DoctorModel/doctorModel';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit{


  imageUrl: string | ArrayBuffer | null = null;
 
  profileForm:FormGroup=new FormGroup({})
  selectedFileName: string = '';
 
  constructor( private builder:FormBuilder,private service:DoctorService){}
 ngOnInit(): void {
   

  this.profileForm=this.builder.group({

  
    qualification:this.builder.control('',Validators.required),
   education:this.builder.control('',Validators.required),
     
    experience:this.builder.control('',Validators.required),
    certification:this.builder.control('',Validators.required),
  
})
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
  const selectedFile = event.target.files[0];
  this.selectedFileName = selectedFile.name;

  // Set the selected file in the form control
  this.profileForm.get('profilePic')?.setValue(selectedFile);
  const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(selectedFile);
}

onSubmitProfile(){
  if(this.profileForm.valid){

  const profData:profileData={

       
        qualification:this.profileForm.value.qualification as string,
        education:this.profileForm.value.qualification as string,
        experience:this.profileForm.value.qualification as string,
        certification:this.profileForm.value.qualification as string,
    


  }

// this.service.Userprofile(profData).subscribe(
//   (response)=>{
//     if(response){
//       console.log(response)
//     }else{
//       console.log("updation failed")
//     }
      
//   }
// )

  }
}



}
