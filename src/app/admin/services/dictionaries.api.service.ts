import { Injectable, EventEmitter } from '@angular/core';
import { BaseCrudApiService } from './base-crud.api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionarieApiService extends BaseCrudApiService{
  applicationSelectedDictionary:any = new EventEmitter();
  constructor(http:HttpClient) {
    super(http);
  }
}
