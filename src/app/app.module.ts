import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

/**
 * Routes
 */
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';

/**
 * Includes
 */
import { SearchComponent } from './includes/search/search.component';
import { TableComponent } from './includes/table/table.component';
import { SidenavComponent } from './includes/sidenav/sidenav.component';

/**
 * Dialogs
 */
import { FreeFoodComponent } from './dialogs/free-food/free-food.component';
import { FreeFoodStudentComponent } from './dialogs/free-food-student/free-food-student.component';
import { CardDefinitionComponent } from './dialogs/card-definition/card-definition.component';
import { PenaltyComponent } from './dialogs/penalty/penalty.component';

const routes:Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    TableComponent,
    SidenavComponent,
    FreeFoodComponent,
    FreeFoodStudentComponent,
    LoginComponent,
    CardDefinitionComponent,
    PenaltyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  entryComponents: [
    FreeFoodComponent,
    FreeFoodStudentComponent,
    CardDefinitionComponent,
    PenaltyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
