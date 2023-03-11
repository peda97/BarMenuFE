import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BarMenu } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  /**
 * GET request to take all data from the endpoint as an Observable of type Data.
 */
  getAllCategories(): Observable<BarMenu>{
     return this.http.get<BarMenu>(environment.endpointBase);
  }
}
