import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service/product.service';

const TRENDING_SEARCH = [
  {
    searchText: 'Iphone',
    uniqueId: 5896174154561
  },
  {
    searchText: 'Oppo',
    uniqueId: 5896174154561
  }
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  searchText: string = '';
  userSearchHistoryList: any[] = [];
  @ViewChild('userSearchList') public userSearchList!: ElementRef<HTMLUListElement>;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.searchText = params?.search;
    })
  }

  onSearchFieldClick() {
    const userSearchHistoryList = this.productService.getUserSearchHistoryList();
    this.userSearchHistoryList = [...userSearchHistoryList, ...TRENDING_SEARCH];
    this.userSearchList.nativeElement.style.display = 'block';
  }

  @HostListener("document:click", ['$event'])
  clickedOut(event: any) {
    if (event.target && 
      event.target.id !== 'product_search'){
        this.userSearchList.nativeElement.style.display = 'none';
      }
  }

  onSearchHistorySelection(event: any, searchText: string) {
    this.searchText = searchText;
    this.searchProducts();
    event.stopPropagation();
  }

  clearSearch() {
    this.searchText = '';
  }

  searchProducts() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.router.navigate(['searchProducts'], { queryParams: {search: this.searchText}});
      this.productService.setUserSearchHistory(this.searchText);
      this.userSearchList.nativeElement.style.display = 'none';
    }
  }

}
