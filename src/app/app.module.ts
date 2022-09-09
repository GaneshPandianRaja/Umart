import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpErrorInterceptor } from './interceptors/http-interceptor';
import { LazyImageDirective } from './directive/lazy-image.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FilterPipe } from './pipes/filter.pipe';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './product_store/product_reducer';
import { ProductEffects } from './product_store/product_effects';
import { EffectsModule } from '@ngrx/effects';

environment
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    ImageCarouselComponent,
    ProductSearchComponent,
    LazyImageDirective,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SlickCarouselModule,
    StoreModule.forRoot({ product: productReducer }),
    EffectsModule.forRoot([ProductEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'API_END_POINT', useValue: () => {
      console.log(environment.production);
      return environment.production ? 'https://www.blibli.com' : '';
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
