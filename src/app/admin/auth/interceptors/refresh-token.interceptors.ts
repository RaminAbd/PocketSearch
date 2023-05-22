import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable, catchError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { LoginRequestDTO } from '../../models/LoginRequestDTO.model';
import { LoginService } from '../login.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private signInService: LoginService,
    private storage: StorageService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          var req: LoginRequestDTO = this.storage.getObject('signin-req') as LoginRequestDTO;
          if (req && req.rememberMe) {
            this.signInService.SignIn(req);
          }
          else {
            this.router.navigate(['/sign-in']);
          }
        }
        return observableThrowError(errorResponse);
      })

    );
  }


}
