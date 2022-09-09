import { Store } from '@ngrx/store';
import { ProductService } from './../../services/product-service/product.service';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface Paging {
  id: string,
  itemsPerPage: number,
  currentPage: number,
  totalItems: number
}


export interface ProductState {
    [searchText: string]: {
      [key: string]: {
        products: any[],
        paging: Paging
      }
    }
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit{
  products!: any[];
  paging!: any;
  searchText: string = '';
  pageNumber: number = 1;
  isLoaded: boolean = false;
  showLoadingBanner: boolean = true;
  productState: ProductState = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private store: Store<ProductState>
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(result => {
      this.searchText = result['search'] || 'samsung';
      this.pageNumber = result['page'] || 1;
      this.showLoadingBanner = true;
      const searchElement = document.querySelector('main');
      searchElement?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});   
      this.getProductBySearchText(this.searchText, this.pageNumber);
    });
  }

  getProductBySearchText(searchText: string, pageNumber: number) {
    const productFromState = this.getProductsFromState(searchText, pageNumber);
    if (productFromState) {
      this.products = productFromState.products;
      this.paging = productFromState.paging;
      this.setPageLoading();
    } else {
      this.productService.getProductsBySearchText(searchText, pageNumber).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.products = [];
            this.paging = {};
            this.setProductsInState(searchText, pageNumber, this.products, this.paging);
            this.setPageLoading();
          } else {
            this.router.navigate(['contact-support']);
          }
          return throwError(error)
        })
      ).subscribe(res => {
          this.products = res?.data?.products;
          const pagingConfig = res?.data?.paging;
          this.paging = {
            id: 'product',
            itemsPerPage: pagingConfig.item_per_page,
            currentPage: this.pageNumber,
            totalItems: pagingConfig.total_page * pagingConfig.item_per_page
          };
          this.setProductsInState(searchText, pageNumber, this.products, this.paging);
          this.setPageLoading();
        });
    }
  }

  setProductsInState(searchText: string, pageNumber: number, products: any[], paging: Paging) {
    if (!this.productState[searchText]) {
      this.productState[searchText] = {};
    }
    this.productState[searchText][pageNumber] = {
      products,
      paging
    }
  }

  getProductsFromState(searchText: string, pageNumber: number) {
     if (this.productState[searchText]) {
       if (this.productState[searchText][pageNumber]) {
        return this.productState[searchText][pageNumber];
       }
     }
     return;
  }


  setPageLoading() {
    this.isLoaded = true;
    this.showLoadingBanner = false;
  }

  pageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event }, queryParamsHandling: 'merge' });
  }

}
