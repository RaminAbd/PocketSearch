import { Component } from '@angular/core';
import { WordRequest } from '../../models/WordRequest.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WordsSense } from '../../models/WordsSense.model';
import { StorageService } from '../../services/storage.service';
import { WordsApiService } from '../../services/words.api.service';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../models/LoginResponse.model';

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
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private storage: StorageService,
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
    var res = this.storage.getObject('authResponse') as LoginResponse;
    req.editor = res.firstName + ' ' + res.lastName;;
    req.isDone = false;
    req.color = 'rgba(236, 64, 122, 0.22)'
    return this.service.Create('words', req);
  }
}
