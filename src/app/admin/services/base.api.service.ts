import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  BASE_URL: string = "http://pocketsearch-001-site1.etempurl.com/api/";
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  get(url?: string, parameter?: any, paramsObj?: any) {
    if (parameter !== null) {
      return this.http.get<any>(this.BASE_URL + url + parameter);
    } else {
      return this.http.get<any>(this.BASE_URL + url, { params: paramsObj });
    }
  }

  post(url?: string, object?: any) {
    return this.http.post<any>(this.BASE_URL + url, object);
  }

  delete(url?: string, parameter?: any, paramsObj?: any) {
    if (parameter !== null) {
      return this.http.delete<any>(this.BASE_URL + url + parameter);
    } else {
      return this.http.delete<any>(this.BASE_URL + url, { params: paramsObj });
    }
  }

}

