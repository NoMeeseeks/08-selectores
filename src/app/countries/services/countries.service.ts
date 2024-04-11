import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/regions.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private urlBase: string = "https://restcountries.com/v3.1";

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http: HttpClient,
  ) {

  }

  get regions(): Region[] {
    //se hace un spread porque se rompe la relacion que hay o un deepclone
    return [...this._regions];
  }

  getPaisesPorRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) { return of([]) }

    const url = `${this.urlBase}/region/${Region}?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        //es para disparar efectos secundarios
        tap(repuesta => {
          console.log(repuesta)
        })
      );
  }
}
