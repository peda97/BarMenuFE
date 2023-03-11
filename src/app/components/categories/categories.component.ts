import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  products!: Product[];
  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let categoryName = params.get("name");
      if(categoryName)
        this.filterProductsByCategory(categoryName);
    })
  }


  private filterProductsByCategory(categoryName: string){
    this.categoriesService.getAllCategories().subscribe({
      next: (result) => {
        let categorySelected = result.categories.filter(element => {
          return this.categoriesService.modifyLinkName(element.name) == categoryName;
        });
        if(categorySelected)
         this.products = categorySelected[0].products.map((element)=>{
          return {
            name: element.name,
            unitPrice: element.unitPrice,
            backgroundColor: this.getRandomColor()
          }
         })
      },
      error: (error) => {
        console.log(error);
      }
    })
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
}
