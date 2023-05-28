import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base.api.service';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  GetForm(serviceUrl: string) {
    return this.get(serviceUrl + '/GetForm', null, null);
  }

  GetAll(serviceUrl: string, lang?: any) {
    if (lang) {
      return this.get(serviceUrl + '/GetAll/', lang, null);
    } else {
      return this.get(serviceUrl + '/GetAll/', null, null);
    }
  }

  Create(serviceUrl: string, form: any) {
    return this.post(serviceUrl + '/Create', form)
  }

  Update(serviceUrl: string, form: any) {
    return this.post(serviceUrl + '/Update', form);
  }

  GetById(serviceUrl: string, id: string) {
    return this.get(serviceUrl, id, null);
  }

  Delete(serviceUrl: string, id: string) {
    return this.delete(serviceUrl + '/Delete/', id);
  }

  GetByIdByLang(serviceUrl: string, req: any) {
    return this.get(serviceUrl, null, req);
  }
  GetWithPaging(serviceUrl: string, req: any) {
    return this.get(serviceUrl + '/GetWithPaging', null, req);
  }

}
