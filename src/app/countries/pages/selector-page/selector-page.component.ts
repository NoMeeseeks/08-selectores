import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/regions.interfaces';
import { HttpClientModule } from '@angular/common/http';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: 'selector-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorPageComponent implements OnInit {

  public paisesPorRegion: SmallCountry[] = [];
  public fronteras: SmallCountry[] = [];

  public form: FormGroup = this.formBuilder.group(
    {
      region: ['', Validators.required],
      pais: ['', Validators.required],
      frontera: ['', Validators.required],
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private countriesServices: CountriesService,
  ) { }

  ngOnInit(): void {
    this.cambiosEnRegion();
    this.cambiosEnPais();
  }

  get regions(): Region[] {
    //se hace un spread porque se rompe la relacion que hay o un deepclone
    return this.countriesServices.regions;
  }

  cambiosEnRegion() {
    //cuando hacemos esto hay que limpiar esas subscripciones
    this.form.controls['region']!.valueChanges
      .pipe(
        tap(() => this.form.get('pais')!.setValue('')),
        tap(() => this.form.get('frontera')!.setValue('')),
        switchMap(region => this.countriesServices.getPaisesPorRegion(region))
      ).subscribe(
        paises => {
          this.paisesPorRegion = paises;
        }
      )
  }

  cambiosEnPais() {
    this.form.controls['pais']!.valueChanges
      .pipe(
        tap(() => this.form.get('frontera')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap(codigoAlpha => this.countriesServices.getPaisPorAlphaCode(codigoAlpha)),
        switchMap(pais => this.countriesServices.getFronteraPaisPorCodigo(pais.borders))
      ).subscribe(
        frontera => {
          this.fronteras = frontera;
        }
      )
  }
}
