import { createAction, props } from "@ngrx/store";
import { Users, otp } from "src/app/user/Model/Usermodel";


export const BEGIN_REGISTER='[auth] begin register';
export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:Users}>())
export const BEGIN_OTPSENDING='[auth] begin register';
export const beginOtpSending=createAction(BEGIN_OTPSENDING,props<{otpdata:otp}>())