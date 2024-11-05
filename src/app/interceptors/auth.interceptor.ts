import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Vérifie si l'environnement est côté client
  const isBrowser = typeof window !== 'undefined';
  
  const token = isBrowser ? localStorage.getItem('token') : null;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq);
};
