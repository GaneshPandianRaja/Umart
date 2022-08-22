import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getLocalStorageItems(fieldName: string) {
    const item = window.localStorage.getItem(fieldName);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  setItemsInLocalStorage(fieldName: string, idx:any){
    const idxStr = JSON.stringify(idx);
    window.localStorage.setItem(fieldName, idxStr);
  }
}
