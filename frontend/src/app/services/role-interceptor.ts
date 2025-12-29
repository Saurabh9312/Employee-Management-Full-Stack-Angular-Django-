import { HttpInterceptorFn } from '@angular/common/http';

export const roleInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // Clone the request and add the authorization header if token exists
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  
  return next(req);
};