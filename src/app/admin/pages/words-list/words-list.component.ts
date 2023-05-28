import { Component } from '@angular/core';
import { WordsListService } from './words-list.service';
import { Router } from '@angular/router';
import { WordsPagingRequest } from '../../models/WordsPagingRequest.model';
import { DictionarieApiService } from '../../services/dictionaries.api.service';
import { WordsPagingResponse } from '../../models/WordsPagingResponse.model';
import { WordsPagingresponseDTO } from '../../models/WordsPagingResponseDTO.model';
import { StorageService } from '../../services/storage.service';
import { CardsDTO } from '../../models/CardsDTO.model';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent {
  WordsList: WordsPagingresponseDTO = new WordsPagingresponseDTO()
  englishLetters: any[] = []
  selectedLetter: any;
  Request: WordsPagingRequest = new WordsPagingRequest();
  cardsInfo: CardsDTO = new CardsDTO();
  constructor(private service: WordsListService, private router: Router, private dictionaryService: DictionarieApiService, private storage: StorageService) {
    this.Request.DictionaryId = this.storage.getObject('dictionaryId') as string;
    dictionaryService.applicationSelectedDictionary.subscribe((dic: any) => {
      this.Request.DictionaryId = dic.id;
      this.service.GetWithPaging(this.Request, this);
      this.service.getCards(this.Request, this);
    })
    this.englishLetters = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));
    this.service.GetWithPaging(this.Request, this);
    this.service.getCards(this.Request, this);
  };
  Create() {
    this.router.navigate(['main/words', 'create'])
  }
  getPage(index: number) {
    this.Request.PageIndex = index;
    this.service.GetWithPaging(this.Request, this);
  }
  getLetter(item: string) {
    this.Request.Letter = item;
    this.service.GetWithPaging(this.Request, this);
  }
  SearchByText() {
    this.service.GetWithPaging(this.Request, this);
  }
  getRowDetail(data: any) {
    console.log(data);
    this.router.navigate(['main/words', data.id])
  }
}
