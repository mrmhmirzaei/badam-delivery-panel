import { NgModule } from '@angular/core';

import {MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule,MatSnackBarModule,MatProgressSpinnerModule,MatBottomSheetModule,MatChipsModule} from '@angular/material';

let module = [MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule,MatSnackBarModule,MatProgressSpinnerModule,MatBottomSheetModule,MatChipsModule];

@NgModule({
  imports: module,
  exports: module
})
export class MaterialModule { }
