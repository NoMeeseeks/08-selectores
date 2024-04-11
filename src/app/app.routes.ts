import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'selector',
    loadChildren: () => import('./countries/countries.routes')
  },
  {
    path: '**',
    redirectTo: 'selector'
  },
]
