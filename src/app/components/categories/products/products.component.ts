import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectedProduct } from 'src/app/models/categories.model';
import { ReceiptComponent } from './receipt/receipt.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor( public dialogRef: MatDialogRef<ProductsComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      productsSelected: SelectedProduct[];
      totalPrice: number;
    }){}

  
    openDialogModal = () => {
      this.dialogRef.close();
      this.matDialog.open(ReceiptComponent, {
        disableClose: true,
      })
    };
}
