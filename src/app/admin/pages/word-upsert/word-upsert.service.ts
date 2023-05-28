import { Injectable } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { WordsApiService } from '../../services/words.api.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { WordsSense } from '../../models/WordsSense.model';
import { WordsPagingRequest } from '../../models/WordsPagingRequest.model';
import { WordUpsertComponent } from './word-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class WordUpsertService {

  constructor(
    private service: WordsApiService,
    private router: Router,
    private storage: StorageService,
    private worsService: WordsApiService
  ) { }

  saveClose(req: WordRequest) {
    req.dictionaryId = this.storage.getObject('dictionaryId');
    console.log(req);
    this.Create(req).subscribe(resp => {
      this.router.navigate(['main'])
    })
  }
  saveNew(req: WordRequest, component: WordUpsertComponent) {
    req.dictionaryId = this.storage.getObject('dictionaryId');
    console.log(req);
    this.Create(req).subscribe(resp => {
      component.Request = new WordRequest()
    })
  }
  SearchByText(sense: WordsSense, type:number) {
    var req = new WordsPagingRequest();
    req.DictionaryId = this.storage.getObject('dictionaryId');
    req.PageIndex = 1;
    req.PageSize = 3;
    req.SearchText = type===1 ? sense.SynonimSearchText : sense.AntonymSearchText;
    this.worsService.GetWithPaging('words', req).subscribe(resp => {
      if(type === 1){
        sense.SearchResults = resp.items;
        console.log('if');
        console.log(sense);
      }
      else{
        console.log('else');
        sense.AntonymSearchResults = resp.items;
      }
    })
  }
  Create(req: WordRequest) {
    return this.service.Create('words', req);
  }
  getById(id: string) {
    return this.service.GetById('words/get/', id);
  }
  update(req:WordRequest){
    return this.service.Update('words', req);
  }
  delete(req:WordRequest){
    return this.service.Delete('words', req.id);
  }
}
