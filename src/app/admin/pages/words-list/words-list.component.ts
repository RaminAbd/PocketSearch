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
  cardsInfo: any[]=[]
  azerbaijani_alphabet = [
    'A', 'B', 'C', 'Ç', 'D', 'E', 'Ə', 'F', 'G', 'Ğ', 'H', 'X', 'I', 'İ', 'J',
    'K', 'Q', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V',
    'Y', 'Z'
  ]
  loading: boolean = false;
  searchLoading: boolean = false;
  constructor(private service: WordsListService, private router: Router, private dictionaryService: DictionarieApiService, private storage: StorageService) {
    this.Request.DictionaryId = this.storage.getObject('dictionaryId') as string;
    dictionaryService.applicationSelectedDictionary.subscribe((dic: any) => {
      this.Request.DictionaryId = dic.id;
      this.service.GetWithPaging(this.Request, this, true);
      this.service.getCards(this.Request, this);
      if (this.Request.DictionaryId === '4e55dd0d-aace-4cb9-a986-6ad54ebf06c8') {
        this.Letters = Array.from(Array(33), (_, i) => String.fromCharCode(4304 + i));
      }
      else {
        this.Letters = this.azerbaijani_alphabet
      }
    })

    if (this.Request.DictionaryId === '4e55dd0d-aace-4cb9-a986-6ad54ebf06c8') {
      this.Letters = Array.from(Array(33), (_, i) => String.fromCharCode(4304 + i));
    }
    else {
      this.Letters = this.azerbaijani_alphabet

    }
    this.service.GetWithPaging(this.Request, this, true);
    this.service.getCards(this.Request, this);
  };
  Create() {
    this.router.navigate(['main/words', 'create'])
  }
  getPage(index: number) {
    this.Request.PageIndex = index;
    this.service.GetWithPaging(this.Request, this, false);
  }
  getLetter(item: string) {
    if (this.Request.Letter !== item) {
      this.Request.Letter = item;
    }
    else {
      this.Request.Letter = '';
    }
    this.service.GetWithPaging(this.Request, this, false);
  }
  SearchByText() {
    this.service.GetWithPaging(this.Request, this, false);
  }
  getRowDetail(data: any) {
    console.log(data);
    this.router.navigate(['main/words', data.id])
  }
}
