import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyImage]'
})
export class LazyImageDirective  implements AfterViewInit{

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const imageOptions = {
      thresold: 1,
      rootMargin: "0px 0px 100px 0px"
    };
    const preloadImage = (img: any) => {
      const src = img.getAttribute('data-src');
      if (!src){
        return;
      }
      img.src = src;
    }
    const imageObserver = new IntersectionObserver(((entries, imgObserver) =>{
      entries.forEach((entry, img)=> {
        if (!entry.isIntersecting) {
          return;
        } else {
          preloadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      })
    }), imageOptions);
    imageObserver.observe(this.elementRef.nativeElement);
  }

}
