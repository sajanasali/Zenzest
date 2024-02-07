import { Injectable } from "@angular/core";
import { createEffect ,ofType,Actions} from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { exhaustMap,map,tap,catchError,switchMap,of } from "rxjs";
import { beginRegister,BEGIN_REGISTER, beginOtpSending } from "./User.action";
import { Router } from "@angular/router";
import { showalert } from "../common/App.action";


@Injectable()
export class UserEffect {
   
    constructor(private action$: Actions, private service: UserService, private route: Router) {
            
    }


    _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action) => {
                console.log(action,"Action")
                return this.service.UserRegisteration(action.userdata).pipe(
                    map((response) => {
                        console.log(response,"response")
                        const email: string = (response as any).email;
                         console.log(email)
                        this.route.navigate(['otpverification'],{ queryParams: { email } })
                       //this.route.navigate(['otpverification'])
                        return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

//     _otpSending = createEffect(() =>
//   this.action$.pipe(
//     ofType(beginOtpSending),
//     exhaustMap((action) =>
//       this.service.sendOtp(action.otpdata).pipe(
//         map(() => {
//           // Assuming successful OTP sending
//           //this.route.navigate(['otpverification']);
//           return showalert({ message: 'OTP sent successfully.', resulttype: 'pass' });
//         }),
//         catchError((_error) => of(showalert({ message: 'Failed to send OTP: ' + _error.message, resulttype: 'fail' })))
//       )
//     )
//   )
// );


}