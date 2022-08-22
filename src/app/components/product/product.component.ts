import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  @Input('product') public product: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mouseover')
  mouseenter() {
    this.product.showImageCarousel = true;
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.product.showImageCarousel = false;
  }


  addItemtoCart(product: any) {
    window.alert(`${product.name} added to your cart`)
  }


}
