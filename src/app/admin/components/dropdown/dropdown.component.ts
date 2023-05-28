import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, display: 'none' })),
      state('show', style({ opacity: 1, display: 'block' })),
      state('hide', style({ opacity: 0, display: 'none' })),
      transition('* <=> *', animate('300ms ease')),
    ])
  ]
})
export class DropdownComponent {
  isOpen = false;
  @Input() set DefaultSelection(value: any) {
    this.selectedOption = this.options.find((x:any) => x.type === value);
  }
  selectedOption: any;
  @Input() options: any;
  @Output() selectValue: any = new EventEmitter();

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  selectOption(option: any): void {
    this.selectValue.emit(this.selectedOption);
    this.isOpen = false;
  }

}
