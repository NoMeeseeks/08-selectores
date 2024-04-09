import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/regions.interfaces';

@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: 'selector-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorPageComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group(
    {
      region: ['', Validators.required],
      pais: ['', Validators.required],
      fronteras: ['', Validators.required],
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private countriesServices: CountriesService,
  ) { }

  ngOnInit(): void {
    this.cambiosEnRegion();
  }

  get regions(): Region[] {
    //se hace un spread porque se rompe la relacion que hay o un deepclone
    return this.countriesServices.regions;
  }

  cambiosEnRegion() {
    //cuando hacemos esto hay que limpiar esas subscripciones
    this.form.controls['region']!.valueChanges
      .subscribe(
        region => {
          console.log(region)
        }
      )
  }
}
