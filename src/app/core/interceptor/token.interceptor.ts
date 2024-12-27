import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const BYPASS_REFRESH = new HttpContextToken(() => false);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _userService = inject(UserService);
  const _router = inject(Router);

  if (req.context.get(BYPASS_REFRESH) === true) {
    return next(req);
  }

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${_userService.getAccessToken()}`,
    },
  });

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return _userService.refresh().pipe(
          switchMap(() => {
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${_userService.getAccessToken()}`,
              },
            });
            return next(newReq);
          }),
          catchError((error) => {
            _userService.logout();
            _router.navigate(['authentication', 'login']);
            return throwError(() => error);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};
