import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectedProduct } from 'src/app/models/categories.model';
import { ReceiptComponent } from './receipt/receipt.component';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor( 
    private matDialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      productsSelected: SelectedProduct[];
      totalPrice: number;
    }, private _bottomSheetRef: MatBottomSheetRef<ProductsComponent>){}

  
    openDialogModal(){
      this._bottomSheetRef.dismiss();
      this._bottomSheetRef.afterDismissed().subscribe(() => {
        this.matDialog.open(ReceiptComponent, {
          disableClose: true,
        })
      });
    };
}
