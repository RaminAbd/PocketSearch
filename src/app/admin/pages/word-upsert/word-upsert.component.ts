import { Component } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { WordsSense } from '../../models/WordsSense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WordUpsertService } from './word-upsert.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateWordComponent } from '../../components/create-word/create-word.component';
import { StorageService } from '../../services/storage.service';
import { LoginResponse } from '../../models/LoginResponse.model';

@Component({
  selector: 'app-word-upsert',
  templateUrl: './word-upsert.component.html',
  styleUrls: ['./word-upsert.component.scss']
})
export class WordUpsertComponent {
  Terminologies: any[] = [];
  selectedTerminology: any;
  Request: WordRequest = new WordRequest();
  WordId: string;
  deleteLoading: boolean = false;
  grammaticalInfoOptions: any[] = [
    {
      "name": "Select",
      "type": undefined,
      "amount": 2,
      "shortenName": '',
    },
    {
      "name": "Isim",
      "type": 1,
      "amount": 0,
      "shortenName": 'is.',
    },
    {
      "name": "Sifət",
      "type": 2,
      "amount": 0,
      "shortenName": 'sif.',
    },
    {
      "name": "Say",
      "type": 3,
      "amount": 0,
      "shortenName": 'say',
    },
    {
      "name": "Əvəzlik",
      "type": 4,
      "amount": 0,
      "shortenName": 'əv.',
    },
    {
      "name": "Feil",
      "type": 5,
      "amount": 0,
      "shortenName": 'feil',
    },
    {
      "name": "Zərf",
      "type": 6,
      "amount": 0,
      "shortenName": 'zərf',
    },
    {
      "name": "Qoşma",
      "type": 7,
      "amount": 0,
      "shortenName": 'qoş.',
    },
    {
      "name": "Bağlayıcı",
      "type": 8,
      "amount": 0,
      "shortenName": 'bağl.',
    },
    {
      "name": "Ədat",
      "type": 9,
      "amount": 0,
      "shortenName": 'əd.',
    },
    {
      "name": "Modal sözlər",
      "type": 10,
      "amount": 0,
      "shortenName": 'modal s.',
    },
    {
      "name": "Nida",
      "type": 11,
      "amount": 0,
      "shortenName": 'nida',
    }
  ]

  constructor(
    private router: Router,
    private service: WordUpsertService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private storage: StorageService
  ) {
    this.primengConfig.ripple = true;
    this.WordId = this.route.snapshot.paramMap.get('id') as string;
    if (this.WordId !== 'create') {
      this.getById(this.WordId);
    }
    this.addSense();
    // this.service.getAllTerminologies(this);
  };

  getById(WordId: string) {
    this.service.getById(WordId).subscribe(resp => {
      console.log(resp);
      this.Request = resp;
      this.Request.senses.forEach(s => {
        s.antonymsForView = []
        s.antonyms.forEach(s1 => {
          s.antonymsForView.push(s1.headWord + ' ( ' + s1.gloss + ' )');
        })
        s.synonymsForView = []
        s.synonyms.forEach(s1 => {
          s.synonymsForView.push(s1.headWord + ' ( ' + s1.gloss + ' )');
        })
      })
    })
  }

  selectGrammaticalInfo(e: any, sense: WordsSense) {
    sense.grammaticalInfo = e.type
    sense.grammaticalInfoForView = e.shortenName;
    if (sense.grammaticalInfo) {
      sense.terminologyId = undefined;
      sense.terminologyForView = undefined;
    }
  }
  selectTerminology(e: any, sense: WordsSense) {
    sense.terminologyId = e.id
    sense.terminologyForView = e.name;
    if (sense.terminologyId) {
      sense.grammaticalInfoForView  = undefined;
      sense.grammaticalInfo = undefined;
    }
  }


  addSense() {
    this.Request.senses.push(new WordsSense());
  }
  deleteSense(index: number) {
    this.Request.senses.splice(index, 1);
  }
  delete() {
    if (this.WordId === 'create') {
      this.router.navigate(['main']);
    }
    else {
      this.deleteLoading = true;
      this.service.delete(this.Request).subscribe(() => {
        this.deleteLoading = false;
        this.router.navigate(['main']);
      })
    }
  }
  saveClose() {
    var res = this.storage.getObject('authResponse') as LoginResponse;
    this.Request.editor = res.firstName + ' ' + res.lastName;
    this.Request.isDone = true;
    this.Request.color = '#fff'
    if (this.WordId === 'create') {
      this.service.saveClose(this.Request);
    }
    else {
      this.service.update(this.Request).subscribe(() => {
        this.router.navigate(['main']);
      })
    }
  }
  saveNew() {
    var res = this.storage.getObject('authResponse') as LoginResponse;
    this.Request.editor = res.firstName + ' ' + res.lastName;
    this.Request.isDone = true;
    this.Request.color = '#fff'
    this.service.saveNew(this.Request, this);
  }



  search(sense: WordsSense) {
    sense.synonymLoading = true
    this.service.SearchByText(sense, 1);
    sense.showSynonymDrop = true;
  }


  clearSearchArray(sense: WordsSense) {
    sense.showSynonymDrop = false;
    sense.SearchResults = [];
  }
  selectSynonym(res: any, sense: WordsSense, synonym: any) {
    sense.synonyms.push(synonym);
    sense.synonymsForView.push(res.headWord + ' ( ' + res.senses.find((x:any)=>x.id === synonym.senseId).gloss + ' )');
    sense.showSynonymDrop = false;
    sense.SearchResults = [];
    sense.SynonimSearchText = '';
    console.log(sense);
  }

  removeSelectedSynonym(index: number, sense: WordsSense) {
    sense.synonyms.splice(index, 1);
    sense.synonymsForView.splice(index, 1);
  }

  showSensesInres(res: any, sense: WordsSense) {
    if (res.senses.length > 1) {
      res.showSenses = true;
    }
    else {
      if (res.senses.length === 1) {
        var synonym = {
          senseId: res.senses[0].id,
          headWord: res.headWord
        }
        this.selectSynonym(res, sense, synonym);
      }
    }
  }

  selectSynonymFromUI(res: any, sense: WordsSense, resSense: WordsSense) {
    var synonym = {
      senseId: resSense.id,
      headWord: res.headWord
    }
    this.selectSynonym(res, sense, synonym)
  }




  searchAntonym(sense: WordsSense) {
    this.service.SearchByText(sense, 2);
    sense.showAntonymDrop = true;
    sense.antonymLoading = true;
  }
  clearAntonymSearchArray(sense: WordsSense) {
    sense.showAntonymDrop = false;
    sense.AntonymSearchResults = [];
  }
  selectAntonym(res: any, sense: WordsSense, antonym: any) {
    sense.antonyms.push(antonym);
    sense.antonymsForView.push(res.headWord + ' ( ' + res.senses.find((x:any)=>x.id === antonym.senseId).gloss + ' )');
    sense.showAntonymDrop = false;
    sense.AntonymSearchResults = [];
    sense.AntonymSearchText = '';
  }

  removeSelectedAntonym(index: number, sense: WordsSense) {
    sense.antonyms.splice(index, 1);
    sense.antonymsForView.splice(index, 1);
  }

  showAntonymSensesInres(res: any, sense: WordsSense) {
    if (res.senses.length > 1) {
      res.showSenses = true;
    }
    else {
      if (res.senses.length === 1) {
        var antonym = {
          senseId: res.senses[0].id,
          headWord: res.headWord
        }
        this.selectAntonym(res, sense, antonym);
      }
    }
  }

  selectAntonymFromUI(res: any, sense: WordsSense, resSense: WordsSense) {
    var antonym = {
      senseId: resSense.id,
      headWord: res.headWord
    }
    this.selectAntonym(res, sense, antonym)
  }

  createWord(sense: WordsSense, type: number) {
    sense.AntonymSearchResults = [];
    sense.showAntonymDrop = false;
    sense.showSynonymDrop = false;
    sense.SearchResults = [];

    const ref = this.dialogService.open(CreateWordComponent, {
      header: 'Create new word',
      width: '85%'
    });
    ref.onClose.subscribe((req) => {
      if (req) {
        if (type === 1) {
          this.search(sense);
        }
        else {
          this.searchAntonym(sense);
        }
      }
    });
  }


  goToBack() {
    this.router.navigate(['main'])
  }

  confirmPosition() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete()
      },
      key: "positionDialog"
    });
  }





}
