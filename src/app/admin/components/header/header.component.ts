import { Component } from '@angular/core';
import { HeaderService } from '../header.service';
import { Dictionary } from '../../models/Dictionary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Dictionaries: Dictionary[] = []
  selectedDictionary: Dictionary = new Dictionary();
  PersonalInfo: any;
  constructor(
    private service: HeaderService,
    private router: Router
  ) {
    service.getDictionaries(this);
    service.getPersonalInfo(this);
  };
  logOut() {
    this.router.navigate(['./login']);
  }
}
