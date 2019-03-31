import { NgModule } from '@angular/core';

import {MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule, MatSnackBarModule} from '@angular/material';

let module = [MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule, MatSnackBarModule];

@NgModule({
  imports: module,
  exports: module
})
export class MaterialModule { }
