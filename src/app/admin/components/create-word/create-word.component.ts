import { Component } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WordsSense } from '../../models/WordsSense.model';
import { StorageService } from '../../services/storage.service';
import { WordsApiService } from '../../services/words.api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-word',
  templateUrl: './create-word.component.html',
  styleUrls: ['./create-word.component.scss']
})
export class CreateWordComponent {
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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private storage:StorageService,
    private service: WordsApiService,
    private messageService: MessageService,
    ) { this.addSense(); };

  addSense() {
    this.Request.senses.push(new WordsSense());
  }
  deleteSense(index: number) {
    this.Request.senses.splice(index, 1);
  }

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
    if (this.validateForm(req)) {
      this.Create(req).subscribe(resp => {
         this.ref.close(this.Request);
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }
  }

  Create(req: WordRequest) {
    return this.service.Create('words', req);
  }
}
