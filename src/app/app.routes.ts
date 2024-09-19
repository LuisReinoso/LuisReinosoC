import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/register-product-page/register-product-page.component').then(m => m.RegisterProductPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
