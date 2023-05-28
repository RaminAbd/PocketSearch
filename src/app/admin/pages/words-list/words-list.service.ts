import { Injectable } from '@angular/core';
import { WordsApiService } from '../../services/words.api.service';
import { Router } from '@angular/router';
import { WordsPagingRequest } from '../../models/WordsPagingRequest.model';
import { WordsListComponent } from './words-list.component';
import { WordsPagingResponse } from '../../models/WordsPagingResponse.model';
import { WordsPagingresponseDTO } from '../../models/WordsPagingResponseDTO.model';
import { Words } from '../../models/Words.model';
import { WordsDTO } from '../../models/WordsDTO.model';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WordsListService {

  constructor(
    private service: WordsApiService,
    private router: Router,
    private storage: StorageService
  ) { }

  GetWithPaging(req: WordsPagingRequest, component: WordsListComponent) {
    this.service.GetWithPaging('words', req).subscribe(resp => {
      console.log(resp);

      this.changeResponse(resp, component)
    })
  }
  changeResponse(resp: WordsPagingResponse, component: WordsListComponent) {
    var dto: WordsPagingresponseDTO = {
      ...resp,
      items: []
    }
    resp.items.forEach((item: Words) => {
      var obj: WordsDTO = new WordsDTO();
      obj.id = item.id;
      obj.headWord = item.headWord;
      item.senses.forEach(s => {
        obj.glosses.push(s.gloss);
        obj.definitions.push(s.definition);
        s.synonyms.forEach(s1 => {
          obj.synonyms.push(s1.headWord);
        })
        s.antonyms.forEach(s1 => {
          obj.antonyms.push(s1.headWord);
        })
      })
      dto.items.push(obj);
    })
    component.WordsList = dto;
  }
  getCards(req: WordsPagingRequest, component: WordsListComponent) {

    this.service.get('Words/GetCounts/', req.DictionaryId).subscribe(resp => {
      var obj = {
        all: resp.find((x: any) => x.type === -1),
        verbs: resp.find((x: any) => x.type === 1),
        pronouns: resp.find((x: any) => x.type === 2),
        nouns: resp.find((x: any) => x.type === 3),
        adverbs: resp.find((x: any) => x.type === 4)
      }
      component.cardsInfo = obj;
    })
  }
}
