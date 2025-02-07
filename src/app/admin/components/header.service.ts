import { Injectable } from '@angular/core';
import { DictionarieApiService } from '../services/dictionaries.api.service';
import { HeaderComponent } from './header/header.component';
import { StorageService } from '../services/storage.service';
import { LoginResponse } from '../models/LoginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private dictionaryService: DictionarieApiService,
    private storage: StorageService,
    private disctionaryService: DictionarieApiService) { }
  getDictionaries(component: HeaderComponent) {
    this.dictionaryService.GetAll('Dictionaries').subscribe(resp => {
      component.Dictionaries = resp.map((item: any) => ({
        ...item,
        viewFrom:item.from === 'ka-Geo' ? 'ქართული' : 'Azərbaycanca',
        viewTo:item.to === 'ka-Geo' ? 'ქართული' : 'Azərbaycanca',
      }));

      component.selectActiveDictionary(component.Dictionaries[0])
    })
  }
  getPersonalInfo(component: HeaderComponent) {
    var obj = (this.storage.getObject('authResponse') as LoginResponse);
    component.PersonalInfo = obj.firstName;
  }
}
