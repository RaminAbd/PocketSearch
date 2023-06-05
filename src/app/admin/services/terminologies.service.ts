import { Injectable } from '@angular/core';
import { BaseApiService } from './base.api.service';
import { HttpClient } from '@angular/common/http';
import { BaseCrudApiService } from './base-crud.api.service';

@Injectable({
  providedIn: 'root'
})
export class TerminologiesService extends BaseCrudApiService {

  constructor(http: HttpClient) { super(http); }

  GetAllByDictionaryId(id: string) {
    return this.get('Terminologies/GetAllByDictionaryId/', id, null);
  }
}
