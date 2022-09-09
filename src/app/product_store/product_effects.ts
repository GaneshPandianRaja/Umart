import { Injectable } from "@angular/core";
import { createEffect, Actions,ofType, concatLatestFrom } from "@ngrx/effects";
import { ProductService } from "../services/product-service/product.service";
import * as productActions from "../product_store/product_actions"
import { Store} from '@ngrx/store'
import { catchError, EMPTY, map, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import {productStore} from './product_reducer';

@Injectable()
export class ProductEffects {
    searchProducts$ = createEffect(() => this.actions$.pipe(
        ofType(productActions.SEARCH_PRODUCTS),
        withLatestFrom(this.store$),
        mergeMap(([action, productStore]) => {
            const { searchText, pageNumber } = productStore.product;
            return this.productService.getProductsBySearchText(searchText, pageNumber)
            .pipe(
                map(
                    (productResponse: any) => {
                        const { data } = productResponse;
                        if (data) {
                            const {products, paging} = data
                            const paginConfig = {
                                id: 'product',
                                itemsPerPage: paging.item_per_page,
                                currentPage: pageNumber,
                                totalItems: paging.total_page * paging.item_per_page
                            };
                            this.store$.dispatch(
                                productActions.UPDATED_SEARCHED_PRODUCTS({products, paging: paginConfig})
                                );
                        }
                        return productResponse;
                    }
                ),
                catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
            )
        })
    ))
  
    constructor(
        private actions$: Actions,
        private store$: Store<productStore>,
        private productService: ProductService) {}
}