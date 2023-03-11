import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from 'src/app/services/categories.service';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductsComponent } from './products/products.component';
import { ReceiptComponent } from './products/receipt/receipt.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [CategoriesService]
})
export class CategoriesModule { }
