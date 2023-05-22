import { Injectable } from '@angular/core';
import { BaseCrudApiService } from './base-crud.api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionarieApiService extends BaseCrudApiService{

  constructor(http:HttpClient) {
    super(http);
  }
}
