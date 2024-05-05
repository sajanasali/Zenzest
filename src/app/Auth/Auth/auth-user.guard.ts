import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from 'src/app/services/userAuth/user-auth.service';
import Swal from 'sweetalert2';

export const authUserGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {


  const authservice=inject(UserAuthService)
    const router=inject(Router)
  
    if(authservice.isLoggedin()){
      return true;
    }else{
      Swal.fire('Warning',"You dont have the permission for access")
      router.navigate(['/login'])
      
      return false;
     
    }
};
