import { NgModule } from '@angular/core';

import {MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule} from '@angular/material';

let module = [MatSidenavModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatInputModule,MatTableModule,MatAutocompleteModule,MatFormFieldModule,MatDialogModule];

@NgModule({
  imports: module,
  exports: module
})
export class MaterialModule { }
