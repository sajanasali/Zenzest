import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminath/admin.service';
import Swal from 'sweetalert2';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AdminService)
    const router=inject(Router)
  
    if(authservice.isLoggedin()){
      return true;
    }else{
      Swal.fire('Warning',"You dont have the permission for access")
      router.navigate(['admin/login'])
      
      return false;
     
    }
};
