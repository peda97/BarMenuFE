import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {

  constructor(public dialogRef: MatDialogRef<ReceiptComponent>,
    public categoriesService: CategoriesService){}

  closeDialogModal = () => {
    this.categoriesService.selectedProducts = [];
    this.categoriesService.productCounter = 0;
    this.categoriesService.totalPrice = 0;
    this.categoriesService.products.forEach(_ => {
      if(_.boxShadow)
        _.boxShadow = 'unset'
    });
    this.dialogRef.close();
  };

}
