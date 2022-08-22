import { catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnInit{
  productList!: any[];
  paging!: any;
  searchText: string = '';
  pageNumber: number = 1;
  isLoaded: boolean = false;
  showLoadingBanner: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(result => {
      this.searchText = result['search'] || 'samsung';
      this.pageNumber = result['page'] || 1;
      this.showLoadingBanner = true;
      const searchElement = document.querySelector('main');
      searchElement?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});      this.getProductBySearchText(this.searchText, this.pageNumber);
    });
  }

  getProductBySearchText(searchText: string, pageNumber: number) {
    this.productService.getProductsBySearchText(searchText, pageNumber).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.productList = [];
          this.paging = {};
          this.isLoaded = true;
          this.showLoadingBanner = false;
        } else {
          this.router.navigate(['contact-support'])
        }
        return throwError(error)
      })
    )
      .subscribe(res => {
        this.productList = res?.data?.products;
        const pagingConfig = res?.data?.paging;
        this.paging = {
          id: 'product',
          itemsPerPage: pagingConfig.item_per_page,
          currentPage: this.pageNumber,
          totalItems: pagingConfig.total_page * pagingConfig.item_per_page
        };
        this.isLoaded = true;
        this.showLoadingBanner = false;
      });
  }

  pageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event }, queryParamsHandling: 'merge' });
  }

}
