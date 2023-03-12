import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, SelectedProduct } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    public categoriesService: CategoriesService,
    private matDialog: MatDialog){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let categoryName = params.get("name");
      if(categoryName)
        this.categoriesService.filterProductsByCategory(categoryName);
    })
  }

  /**
 * Add to the cart the selected product, calculate price and counter,
 * and add box shadow for the product selected
 */
  selectProduct(selectedProduct: Product){
    if(this.categoriesService.selectedProducts.length > 0){
      const index = this.categoriesService.selectedProducts.findIndex(product => product.name === selectedProduct.name);
      if(index > -1){
        //product exists in the list
        this.categoriesService.selectedProducts[index].price += selectedProduct.unitPrice;
        this.categoriesService.selectedProducts[index].quantity +=1;
        this.categoriesService.totalPrice += selectedProduct.unitPrice;
      }else{
        //product does not exist in the list
        this.categoriesService.selectedProducts.push({
          name: selectedProduct.name,
          price: selectedProduct.unitPrice,
          quantity: 1
        });
        this.categoriesService.totalPrice += selectedProduct.unitPrice;
        this.categoriesService.productCounter ++;
        this.categoriesService.products.forEach(_ => {
          if(_.name === selectedProduct.name)
            _.boxShadow = "inset 0 0 0 1000px rgba(0,0,0,.2)";
        });
      }
    }
    else{
      // the first product
      this.categoriesService.selectedProducts.push({
        name: selectedProduct.name,
        price: selectedProduct.unitPrice,
        quantity: 1
      });
      this.categoriesService.products.forEach(_ => {
        if(_.name === selectedProduct.name)
          _.boxShadow = "inset 0 0 0 1000px rgba(0,0,0,.2)";
      });
      this.categoriesService.totalPrice += selectedProduct.unitPrice;
      this.categoriesService.productCounter ++;
    }
  }

  /**
 * Open modal
 */
  openModal = () => {
    this.matDialog.open(ProductsComponent, {
      disableClose: true,
      data: {
        productsSelected: this.categoriesService.selectedProducts,
        totalPrice: this.categoriesService.totalPrice
      },
    })
  };

}
