import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const service = inject(AdminService)
  const router = inject(Router)
  if(service.isloggedin()){
    return true;
  }
  else{
    alert("Operation denied!!! Please Login...")
    router.navigateByUrl("")
    return false
  }
};
