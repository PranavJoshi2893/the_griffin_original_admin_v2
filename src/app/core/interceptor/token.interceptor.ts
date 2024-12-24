import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _userService = inject(UserService);

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${_userService.getAccessToken()}`,
    },
  });

  return next(clonedReq);
};
