import { Injectable } from "@angular/core";
import { createEffect ,ofType,Actions} from "@ngrx/effects";
import { AuthService } from "src/app/services/doctorAuth/auth.service";
import { exhaustMap,map,tap,catchError,switchMap,of } from "rxjs";
import { beginRegister } from "./Doctor.action";
import { Router } from "@angular/router";
import { showalert } from "../common/App.action";


@Injectable()
export class UserEffect {
   
    constructor(private action$: Actions, private service: AuthService, private route: Router) {
            
    }


    _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action) => {
                console.log(action,"Action")
                return this.service.DoctorRegisteration(action.userdata).pipe(
                    map((response) => {
                        console.log(response,"response")
                        const email: string = (response as any).email;
                         console.log(email)
                        this.route.navigate(['doctor/otp'],{ queryParams: { email } })
                       //this.route.navigate(['otpverification'])
                        return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )
        }