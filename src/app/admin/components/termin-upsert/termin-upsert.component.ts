import { Component } from '@angular/core';
import { TerminologyRequest } from './TerminologyRequest.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StorageService } from '../../services/storage.service';
import { TerminologiesService } from '../../services/terminologies.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-termin-upsert',
  templateUrl: './termin-upsert.component.html',
  styleUrls: ['./termin-upsert.component.scss']
})
export class TerminUpsertComponent {
  request: TerminologyRequest = new TerminologyRequest()
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private storage: StorageService,
    private service: TerminologiesService,
    private messageService: MessageService,
  ) {

    console.log(config.data);
    this.request = config.data;
  };
  delete() {
    if(this.request.id){
      this.service.Delete('Terminologies', this.request.id).subscribe(resp=>{
        this.ref.close()
      })
    }
    else{
      this.ref.close()
    }
  }
  create() {
    this.request.dictionaryId = this.storage.getObject('dictionaryId') as string;
    if (this.validateForm(this.request)) {
      this.service.Create('Terminologies', this.request).subscribe(res => {
        if (res) {
          this.ref.close();
        }
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }
  }
  validateForm(req: TerminologyRequest) {
    var isValid = false;
    if (req.name && req.shortenName) {
      isValid = true;
    }
    else {
      isValid = false;
    }
    return isValid;
  }
  update(){
    this.request.dictionaryId = this.storage.getObject('dictionaryId') as string;
    if (this.validateForm(this.request)) {
      this.service.Update('Terminologies', this.request).subscribe(res => {
        if (res) {
          this.ref.close();
        }
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
    }
  }

}
