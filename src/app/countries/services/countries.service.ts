import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry, Name, Maps } from '../interfaces/regions.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of, tap } from 'rxjs';

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

    const url = `${this.urlBase}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        //   es para disparar efectos secundarios
        tap(repuesta => {
          console.log(repuesta)
        })
      );
  }

  getPaisPorAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${this.urlBase}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<SmallCountry>(url)
      .pipe(
        //es para disparar efectos secundarios
        tap(repuesta => {
          console.log(repuesta)
        })
      );
  }

  getFronteraPaisPorCodigo(fronteras: string[]): Observable<SmallCountry[]> {
    if (!fronteras || fronteras.length === 0) { return of([]) }

    const paisesRequest: Observable<SmallCountry>[] = [];

    fronteras.forEach(codigo => {
      const request = this.getPaisPorAlphaCode(codigo);
      paisesRequest.push(request);
    })
    return combineLatest(paisesRequest)
  }
}
