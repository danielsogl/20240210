import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public get token(): string | null {
    return localStorage.getItem('token') ?? 'NO_TOKEN';
  }
}

export function getAuthToken(): string | null {
  const storage = inject(StorageService);
  return storage.token;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(StorageService).token;
  // const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
