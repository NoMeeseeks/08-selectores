import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/regions.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http: HttpClient,
  ) {

  }

  get regions(): Region[] {
    //se hace un spread porque se rompe la relacion que hay o un deepclone
    return [...this._regions];
  }

  getPaisesPorRegion(region: Region): SmallCountry[] {

    return [];
  }
}
