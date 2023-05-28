import { Component } from '@angular/core';
import { HeaderService } from '../header.service';
import { Dictionary } from '../../models/Dictionary.model';
import { Router } from '@angular/router';
import { DictionarieApiService } from '../../services/dictionaries.api.service';
import { StorageService } from '../../services/storage.service';

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
    private router: Router,
    private dictionaryService: DictionarieApiService,
    private storage: StorageService
  ) {
    this.service.getDictionaries(this);
    this.service.getPersonalInfo(this);
  };

  logOut() {
    this.router.navigate(['./login']);
  }

  selectActiveDictionary(dict: any) {
    this.selectedDictionary = dict;
    this.dictionaryService.applicationSelectedDictionary.emit(this.selectedDictionary);
    this.storage.saveObject('dictionaryId', this.selectedDictionary.id);
  }
  goToHome(){
    this.router.navigate(['main'])
  }
}
