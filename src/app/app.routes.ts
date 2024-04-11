import { Routes } from '@angular/router';
import { SelectorPageComponent } from './countries/pages/selector-page/selector-page.component';

export const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.routes').then(r => r.routes)
  },
  {
    path: '**',
    redirectTo: 'selector'
  },
]
