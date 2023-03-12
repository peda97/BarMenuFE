import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BarMenu, Product, SelectedProduct } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  products: Product[] = [];
  selectedProducts: SelectedProduct[] = [];
  totalPrice: number = 0;
  productCounter: number = 0;
  isPageVisible: boolean = false;

  constructor(private http: HttpClient) { }

  /**
 * GET request to take all data from the endpoint as an Observable of type Data.
 */
  getAllCategories(): Observable<BarMenu>{
     return this.http.get<BarMenu>(environment.endpointBase);
  }


   /**
 * Filter products in base of the category.
 */
  filterProductsByCategory(categoryName: string){
    this.getAllCategories().subscribe({
      next: (result) => {
        let categorySelected = result.categories.filter(element => {
          return this.modifyLinkName(element.name) == categoryName;
        });
        if(categorySelected)
          this.products = categorySelected[0].products.map((element)=>{
            return {
              name: element.name,
              unitPrice: element.unitPrice,
              backgroundColor: this.getRandomColor()
            }
           });
        this.isPageVisible = true;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  /**
 * Replace &,/ and space with -.
 * @param {string} categoryName - A string param
 * @return {string} Return a string
 */
  modifyLinkName(categoryName: string): string{
    return categoryName.toLowerCase().split(' ').join('-').split('/').join('').split('&').join('-');
  }

   /*
   Generates random colors for each product.
  */
   getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

/*
 * Get first letter, if it is not a letter return "N" for no letters
*/
getFirstLetter(name: string) {
  if (/^[a-z]/i.test(name)) {
    return name.charAt(0).toUpperCase();
  } else {
    name = name.replace(/[^a-zA-Z]/g, "");
    name = name.replace(/^\d/g, "");
    if(name)
      return name.charAt(0).toUpperCase();
    return "N"
  }
}
}
