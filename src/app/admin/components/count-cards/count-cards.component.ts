import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { CardsDTO } from '../../models/CardsDTO.model';

@Component({
  selector: 'app-count-cards',
  templateUrl: './count-cards.component.html',
  styleUrls: ['./count-cards.component.scss']
})
export class CountCardsComponent {
  @Output() create = new EventEmitter();
  @Input() CardsInfo:any[] =[]
  constructor() { };

}
