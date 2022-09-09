
import { createSelector } from '@ngrx/store';
import { ProductState } from './product_reducer';


export const selectSearchText = (state: ProductState) => state.searchText;

export const selectPageNumber = (state: ProductState) => state.pageNumber;

