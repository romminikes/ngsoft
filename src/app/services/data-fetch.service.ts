import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, zip, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  readonly urlAllData = "https://my-json-server.typicode.com/galits/testNgsoft/db";
  readonly url = "https://my-json-server.typicode.com/galits/testNgsoft/"
  readonly endPoints = {
    passeges: '/passages',
    origins: '/origins',
    categories: '/categories',
    unitMeasures: '/unitMeasures',
    ingredients: '/ingredients'
  }

  constructor(private http: HttpClient) {

  }

  getAlldata() {
    return this.http.get<DbData>(this.urlAllData);
  }

  getFirstStepData() {
    const url = this.url + this.endPoints.passeges;
    return this.http.get<DefaultType[]>(url);
  }

  getSecondStepData() {
    const url = this.url + this.endPoints.origins;
    return this.http.get<DefaultType[]>(url);
  }

  getThirdStepData() {
    const categoriesUrl = this.url + this.endPoints.categories;
    const categories = this.http.get<DefaultType[]>(categoriesUrl).toPromise();

    const unitMeasuresUrl = this.url + this.endPoints.unitMeasures;
    const unitMeasures = this.http.get<DefaultType[]>(unitMeasuresUrl).toPromise();

    const ingredientsUrl = this.url + this.endPoints.ingredients;
    const ingredients$ = this.http.get<Ingredient[]>(ingredientsUrl);

    return {
      ingredients: ingredients$,
      unitMeasures,
      categories
    }
  }
}
