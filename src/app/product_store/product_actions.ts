import { createAction, props } from '@ngrx/store';
import { Paging } from './product_reducer';

export const SEARCH_PRODUCTS = createAction('SEARCH_PRODUCTS');
export const UPDATE_SEARCH_TEXT = createAction('UPDATE_SEARCH_TEXT',
props<{ searchText: string}>());
export const UPDATE_PAGE_NUMBER = createAction('UPDATE_PAGE_NUMBER', 
props<{ pageNumber: number }>());
export const UPDATED_SEARCHED_PRODUCTS = createAction('UPDATED_SEARCHED_PRODUCTS', 
props<{products: any[], paging: Paging}>())
export const UPDATE_SEARCH_ERROR_TYPE = createAction('UPDATE_SEARCH_ERROR_TYPE', props< {errorType: string}>());
