import { createAction, props } from "@ngrx/store";
import { Doctors } from "src/app/DoctorComponents/DoctorModel/doctorModel";


export const BEGIN_REGISTER='[auth] begin register';
export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:Doctors}>())