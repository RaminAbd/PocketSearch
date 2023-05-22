import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { LoginResponse } from '../../models/LoginResponse.model';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  token: string;
  constructor(private storage: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var obj = (this.storage.getObject('authResponse') as LoginResponse);
    if (obj) {
      this.token = obj.token;
      const req1 = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });
      return next.handle(req1);
    }
    else {
      return next.handle(req);
    }
  }
}
