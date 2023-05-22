import { Injectable } from '@angular/core';
import { BaseApiService } from './base.api.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDTO } from '../models/LoginRequestDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends BaseApiService {

  constructor(http: HttpClient) { super(http); }
  SignIn(req: LoginRequestDTO) {
    return this.post('Users/SignIn', req)
  }
}
