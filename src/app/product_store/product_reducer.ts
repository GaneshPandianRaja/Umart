import { createReducer, on } from '@ngrx/store';
import * as productActions from './product_actions';

export interface productStore {
   product: ProductState
}

export interface Paging{
   id: string,
   itemsPerPage: number,
   currentPage: number,
   totalItems: number
}

export interface ProductState {
    productMap: any,
    pageNumber: number,
    searchText: string,
    errorType: string,
    paging: Paging,
    isLoaded: boolean,
    showLoadingBanner: boolean
}


export const initialState: ProductState = {
    productMap: {},
    pageNumber: 0,
    searchText: '',
    errorType: '',
    paging: {
      id: 'product',
      itemsPerPage: 0,
      currentPage: 0,
      totalItems: 0
    },
    isLoaded: false,
    showLoadingBanner: true
}

export const productReducer = createReducer(initialState,
     on(productActions.UPDATE_SEARCH_TEXT, (state: ProductState, {searchText}) => ({
        ...state,
        searchText: searchText
     })),
     on(productActions.UPDATE_PAGE_NUMBER, (state: ProductState, {pageNumber}) => ({
        ...state,
        pageNumber: pageNumber
     })),
     on(productActions.UPDATED_SEARCHED_PRODUCTS, (state: ProductState, {products, paging}) =>({
        ...state,
        paging: paging,
        isLoaded: true,
        showLoadingBanner: false,
        productMap: {
         ...state.productMap,
         [paging.currentPage]: products
        }
     })),
     on(productActions.UPDATE_SEARCH_ERROR_TYPE, (state: ProductState, {errorType}) => ({
        ...state,
        errorType: errorType
     }))
    );




