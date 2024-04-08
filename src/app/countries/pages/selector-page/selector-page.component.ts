import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: 'selector-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorPageComponent { }
