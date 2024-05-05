import { createEntityAdapter } from "@ngrx/entity";
import { Doctors,DoctorModel } from "src/app/DoctorComponents/DoctorModel/doctorModel";


export const UserAdapter=createEntityAdapter<Doctors>()

export const UserState: DoctorModel = UserAdapter.getInitialState({
   
    
   
    userinfo:{
       
       name: '',
        email: '',
        sex:'',
        age:'',
        mobile: '',
        status: false,
      
    }
}




)