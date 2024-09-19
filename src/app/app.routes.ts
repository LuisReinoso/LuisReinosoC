import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list-product-page/list-product-page.component').then(m => m.ListProductPageComponent),
  },
  {
    path: 'register-product',
    loadComponent: () =>
      import('./pages/register-product-page/register-product-page.component').then(m => m.RegisterProductPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
