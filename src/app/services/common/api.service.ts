import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    @Inject('API_END_POINT') public getAPIEndPoint: any) { }

  get(url: string){
    url = `${this.getAPIEndPoint()}${url}`
    return this.http.get<any>(url);
  }
}
