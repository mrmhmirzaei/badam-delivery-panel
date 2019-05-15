import { NgModule } from '@angular/core';

import { MatSidenavModule,
   MatToolbarModule, MatMenuModule,
   MatButtonModule, MatInputModule,
   MatTableModule, MatAutocompleteModule,
   MatFormFieldModule, MatDialogModule,
   MatSnackBarModule, MatProgressSpinnerModule,MatCardModule,   MatBottomSheetModule, MatChipsModule, MatSelectModule} from '@angular/material';

const module = [
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatDialogModule, MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatBottomSheetModule,
  MatSelectModule,
  MatChipsModule];

@NgModule({
  imports: module,
  exports: module
})
export class MaterialModule { }
