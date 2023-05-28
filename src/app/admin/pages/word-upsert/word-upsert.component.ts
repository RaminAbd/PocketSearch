import { Component } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { WordsSense } from '../../models/WordsSense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WordUpsertService } from './word-upsert.service';

@Component({
  selector: 'app-word-upsert',
  templateUrl: './word-upsert.component.html',
  styleUrls: ['./word-upsert.component.scss']
})
export class WordUpsertComponent {
  Request: WordRequest = new WordRequest();
  WordId: string;
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

  constructor(private router: Router, private service: WordUpsertService, private route: ActivatedRoute) {
    this.WordId = this.route.snapshot.paramMap.get('id') as string;
    if (this.WordId !== 'create') {
      this.getById(this.WordId);
    }
  };

  getById(WordId: string) {
    this.service.getById(WordId).subscribe(resp => {
      console.log(resp);
      this.Request = resp
    })
  }


  addSense() {
    this.Request.senses.push(new WordsSense());
  }
  deleteSense(index: number) {
    this.Request.senses.splice(index, 1);
  }
  delete() {
    this.router.navigate(['main']);
  }
  saveClose() {
    this.service.saveClose(this.Request);
  }
  saveNew() {
    this.service.saveNew(this.Request, this);
  }
  search(sense: WordsSense) {
    this.service.SearchByText(sense,1);
    sense.showSynonymDrop = true;
  }
  clearSearchArray(sense: WordsSense) {
    sense.showSynonymDrop = false;
    sense.SearchResults = [];
  }
  selectSynonym(res: any, sense: WordsSense) {
    var synonym = {
      senseId: res.senses[0].id,
      headWord: res.headWord
    }
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




  searchAntonym(sense: WordsSense) {
    this.service.SearchByText(sense, 2);
    sense.showAntonymDrop = true;
  }
  clearAntonymSearchArray(sense: WordsSense) {
    sense.showAntonymDrop = false;
    sense.AntonymSearchResults = [];
  }
  selectAntonym(res: any, sense: WordsSense) {
    var antonym = {
      senseId: res.senses[0].id,
      headWord: res.headWord
    }
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




  goToBack() {
    this.router.navigate(['main'])
  }
}
