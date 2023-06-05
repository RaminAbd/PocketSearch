import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StorageService } from '../../services/storage.service';
import { TerminologiesService } from '../../services/terminologies.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TerminUpsertComponent } from '../termin-upsert/termin-upsert.component';
import { TerminologyRequest } from '../termin-upsert/TerminologyRequest.model';

@Component({
  selector: 'app-termin-drop',
  templateUrl: './termin-drop.component.html',
  styleUrls: ['./termin-drop.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, display: 'none' })),
      state('show', style({ opacity: 1, display: 'block' })),
      state('hide', style({ opacity: 0, display: 'none' })),
      transition('* <=> *', animate('300ms ease')),
    ])
  ]
})
export class TerminDropComponent {
  constructor(
    private storage: StorageService,
    private termService: TerminologiesService,
    public dialogService: DialogService,
  ) {
    this.getAllTerminologies()
    // this.create()
  };

  isOpen = false;
  @Input() set DefaultSelection(value: any) {
    this.selectedOption = this.options?.find((x: any) => x.id === value);
  }
  selectedOption: any;
  options: any=[] =[];
  @Output() selectValue: any = new EventEmitter();

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any): void {
    this.selectedOption = option;
    this.selectValue.emit(this.selectedOption);
    this.isOpen = false;
  }

  getAllTerminologies() {
    this.options = []
    var dictId = this.storage.getObject('dictionaryId');
    var noneObj = {
      "name": "-------------",
      "dictionaryId": "1721e505-5320-4f8d-8513-8b995d1778f0",
      "shortenName": "-----",
      "id": null
    }
    this.options.push(noneObj);
    this.termService.GetAllByDictionaryId(dictId).subscribe(resp => {
      console.log(resp);
      this.options.push(...resp);
    })
  }
  create() {
    const ref = this.dialogService.open(TerminUpsertComponent, {
      header: 'Create new terminology',
      width: '55%',
      data: new TerminologyRequest()
    });
    ref.onClose.subscribe((req) => {
      this.getAllTerminologies()
    });
  }
  update(item: any) {
    const ref = this.dialogService.open(TerminUpsertComponent, {
      header: 'Create new terminology',
      width: '55%',
      data: item
    });
    ref.onClose.subscribe((req) => {
      this.getAllTerminologies()
    });
  }
}
