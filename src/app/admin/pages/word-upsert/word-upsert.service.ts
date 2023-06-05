import { Injectable } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { WordsApiService } from '../../services/words.api.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { WordsSense } from '../../models/WordsSense.model';
import { WordsPagingRequest } from '../../models/WordsPagingRequest.model';
import { WordUpsertComponent } from './word-upsert.component';
import { MessageService } from 'primeng/api';
import { TerminologiesService } from '../../services/terminologies.service';

@Injectable({
  providedIn: 'root'
})
export class WordUpsertService {

  constructor(
    private service: WordsApiService,
    private router: Router,
    private storage: StorageService,
    private worsService: WordsApiService,
    private messageService: MessageService,
    private termService:TerminologiesService
  ) { }

  validateForm(req: WordRequest) {
    var isValid = false;
    if (req.headWord) {
      isValid = true;
    }
    else {
      isValid = false;
    }
    if (req.senses.length > 0) {
      isValid = true;
      req.senses.forEach(x => {
        if (x.gloss) {
          isValid = true;
        }
        else {
          isValid = false;
        }
      })
    }
    else {
      isValid = false;
    }
    return isValid;
  }


  saveClose(req: WordRequest) {
    req.dictionaryId = this.storage.getObject('dictionaryId');
    console.log(req);
    if (this.validateForm(req)) {
      this.Create(req).subscribe(resp => {
        this.router.navigate(['main'])
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }

  }
  saveNew(req: WordRequest, component: WordUpsertComponent) {
    req.dictionaryId = this.storage.getObject('dictionaryId');
    if (this.validateForm(req)) {
      this.Create(req).subscribe(resp => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Created successfully' });
        component.Request = new WordRequest()
        component.addSense();
      },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }
  }
  SearchByText(sense: WordsSense, type: number) {
    var req = new WordsPagingRequest();
    req.DictionaryId = this.storage.getObject('dictionaryId');
    req.PageIndex = 1;
    req.PageSize = 3;
    req.SearchText = type === 1 ? sense.SynonimSearchText : sense.AntonymSearchText;
    this.worsService.GetWithPaging('words', req).subscribe(resp => {
      if (type === 1) {
        sense.SearchResults = resp.items;
        sense.synonymLoading = false;
      }
      else {
        sense.AntonymSearchResults = resp.items;
        sense.antonymLoading = false;

      }
    })
  }
  Create(req: WordRequest) {
    return this.service.Create('words', req);
  }
  getById(id: string) {
    return this.service.GetById('words/get/', id);
  }
  update(req: WordRequest) {
    return this.service.Update('words', req);
  }
  delete(req: WordRequest) {
    return this.service.Delete('words', req.id);
  }


  // getAllTerminologies(component:WordUpsertComponent) {
  //   var dictId = this.storage.getObject('dictionaryId');
  //   this.termService.GetAllByDictionaryId(dictId).subscribe(resp => {
  //     component.Terminologies = resp.options;
  //   })
  // }
}
