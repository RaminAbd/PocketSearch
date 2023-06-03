import { Component } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { WordsSense } from '../../models/WordsSense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WordUpsertService } from './word-upsert.service';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateWordComponent } from '../../components/create-word/create-word.component';

@Component({
  selector: 'app-word-upsert',
  templateUrl: './word-upsert.component.html',
  styleUrls: ['./word-upsert.component.scss']
})
export class WordUpsertComponent {
  Request: WordRequest = new WordRequest();
  WordId: string;
  deleteLoading: boolean = false;
  grammaticalInfoOptions: any[] = [
    {
      "name": "Verbs",
      "type": 1,
      "amount": 2
    },
    {
      "name": "Pronouns",
      "type": 2,
      "amount": 0
    },
    {
      "name": "Nouns",
      "type": 3,
      "amount": 0
    },
    {
      "name": "Adverbs",
      "type": 4,
      "amount": 0
    }
  ]

  constructor(
    private router: Router,
    private service: WordUpsertService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) {
    this.primengConfig.ripple = true;
    this.WordId = this.route.snapshot.paramMap.get('id') as string;
    if (this.WordId !== 'create') {
      this.getById(this.WordId);
    }
    this.addSense();
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
      this.service.delete(this.Request).subscribe(resp => {
        this.deleteLoading = false;
        this.router.navigate(['main']);
      })
    }
  }
  saveClose() {
    if (this.WordId === 'create') {
      this.service.saveClose(this.Request);
    }
    else {
      this.service.update(this.Request).subscribe(response => {
        this.router.navigate(['main']);
      })
    }
  }
  saveNew() {
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
    sense.synonymsForView.push(res.headWord + ' ( ' + res.senses[0].gloss + ' )');
    sense.showSynonymDrop = false;
    sense.SearchResults = [];
    sense.SynonimSearchText = '';
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
    sense.antonymsForView.push(res.headWord + ' ( ' + res.senses[0].gloss + ' )');
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

  createWord(sense: WordsSense) {
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
        console.log('creeated');
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
