import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input('products') public productList: any[] = []
  @Input('paging') public paging: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  
}
