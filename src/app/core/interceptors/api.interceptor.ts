import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = 'free_user_3FDmCLWvwpRapPbHmpD9OYhahXb';
  const modifiedReq = req.clone({
    setHeaders: {
      'x-api-key': apiKey,
      'X-Reqres-Env': 'prod'
    }
  });
  
  return next(modifiedReq);
};