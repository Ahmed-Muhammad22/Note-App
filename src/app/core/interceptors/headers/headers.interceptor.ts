import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platId = inject(PLATFORM_ID)
  if (isPlatformBrowser(platId)) {
    if (localStorage.getItem('token') !== null) {
    if (req.url.includes('notes')) {
      req = req.clone({
        setHeaders: {
          token: `3b8ny__${localStorage.getItem('token')!}`,
        },
      });
    }
  }
 }

  return next(req);
};
