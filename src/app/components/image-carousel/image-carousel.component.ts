import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
})
export class ImageCarouselComponent {
  @Input('images') images!: string[];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
    fade: true,
    cssEase: 'linear',
  };
  constructor() { }

}
