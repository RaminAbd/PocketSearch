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
  Letters: string[] = []
  selectedLetter: any;
  Request: WordsPagingRequest = new WordsPagingRequest();
  cardsInfo: CardsDTO = new CardsDTO();
  constructor(private service: WordsListService, private router: Router, private dictionaryService: DictionarieApiService, private storage: StorageService) {
    this.Request.DictionaryId = this.storage.getObject('dictionaryId') as string;
    dictionaryService.applicationSelectedDictionary.subscribe((dic: any) => {
      this.Request.DictionaryId = dic.id;
      this.service.GetWithPaging(this.Request, this);
      this.service.getCards(this.Request, this);
      if (this.Request.DictionaryId === '4e55dd0d-aace-4cb9-a986-6ad54ebf06c8') {
        this.Letters = Array.from(Array(33), (_, i) => String.fromCharCode(4304 + i));
      }
      else {
        this.Letters = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));
      }
    })

    if (this.Request.DictionaryId === '4e55dd0d-aace-4cb9-a986-6ad54ebf06c8') {
      this.Letters = Array.from(Array(33), (_, i) => String.fromCharCode(4304 + i));
    }
    else {
      this.Letters = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));
    }
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
    if (this.Request.Letter !== item) {
      this.Request.Letter = item;
    }
    else {
      this.Request.Letter = '';
    }
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
