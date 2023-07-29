import { Injectable } from '@angular/core';
import { LoginRequestDTO } from '../models/LoginRequestDTO.model';
import { UsersApiService } from '../services/users.api.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private usersApiService: UsersApiService,
    private router: Router,
    private storage: StorageService
  ) {

  }
  SignIn(req: LoginRequestDTO) {
    console.log(req)
    this.usersApiService.SignIn(req).subscribe(resp => {
      console.log(resp)
      this.router.navigate(['/main']);
      this.storage.saveObject('authResponse', resp);
      this.storage.saveObject('signin-req', req);
    })
  }
}
