import { HttpInterceptorFn } from '@angular/common/http';

export const bookingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
