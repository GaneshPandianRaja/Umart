import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { UtilService } from '../common/util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PRODUCT_GET_ALL_API = '/backend/search/products?';
  ITEMS_PER_PAGE = 24;
  constructor(private apiService: ApiService,
    private utilService: UtilService) { }

  getProductsBySearchText(searchTerm: string, start: number) {
    const params = {
      searchTerm,
      start,
      itemPerPage: this.ITEMS_PER_PAGE
    };
    return this.getProducts(params);
  }

  getProducts(params: any) {
    let URL = this.PRODUCT_GET_ALL_API;
    for (const param in params) {
      URL += `${param}=${params[param]}&`
    }
    return this.apiService.get(URL);
  }

  getUserSearchHistoryList() {
    let searchList = this.utilService.getLocalStorageItems('userSearchHistory');
      if (searchList && searchList.length > 0) {
        return searchList;
    }
    return [];
  }

  setUserSearchHistory(searchTerm: string) {
    const currentUserSearchHistory = {
      searchText: searchTerm,
      type: 'user_search'
    };
    let previousUserSearchHistory: any = this.getUserSearchHistoryList();
    previousUserSearchHistory = previousUserSearchHistory.filter((searchHistory: any) => {
      return searchHistory.searchText !== searchTerm;
    });
    const newUserSearchHistory = [currentUserSearchHistory, ...previousUserSearchHistory];
    this.utilService.setItemsInLocalStorage('userSearchHistory', newUserSearchHistory)
  }
}
