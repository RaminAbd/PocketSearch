import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequestDTO } from '../../models/LoginRequestDTO.model';
import { LoginService } from '../login.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  SignInForm: FormGroup;
  signInRequest: LoginRequestDTO = new LoginRequestDTO();
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private storage: StorageService
  ) { this.setSignInForm(); this.storage.clear(); };

  setSignInForm() {
    this.SignInForm = this.formBuilder.group({
      username: '',
      password: '',
      remember: '',
    })
  }

  Submit() {
    this.service.SignIn(this.signInRequest);

  }
}
