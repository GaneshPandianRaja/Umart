import { ProductSearchComponent } from './components/product-search/product-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'searchProducts',
    pathMatch: 'full'
  },
  {
    path: 'searchProducts',
    component: ProductSearchComponent
  },
  {
    path: 'contact-support',
    loadComponent: () => import('./components/contact-support/contact-support.component').then(
      mod => mod.ContactSupportComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
