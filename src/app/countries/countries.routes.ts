import { Routes } from "@angular/router";
import { SelectorPageComponent } from "./pages/selector-page/selector-page.component";

export default [
  {
    path: '',
    children: [
      {
        path: 'selector', component: SelectorPageComponent
      },
    ]
  },
] as Routes;
