import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/doctorAuth/auth.service';
import Swal from 'sweetalert2';

export const authDoctorGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthService)
    const router=inject(Router)
  
    if(authservice.isLoggedin()){
      return true;
    }else{
      Swal.fire('Warning',"You dont have the permission for access")
      router.navigate(['doctor/login'])
      
      return false;
     
    }
};
