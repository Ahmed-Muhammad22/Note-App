import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platId = inject(PLATFORM_ID)
  const router = inject(Router)
  if (isPlatformBrowser(platId)) {
      if(localStorage.getItem('token') !== null){
         return true
    }
      else {
        router.navigate(['/login'])
        return false
    }
  }

  else {
    return false
 }



};
