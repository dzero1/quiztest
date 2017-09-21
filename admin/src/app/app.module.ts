import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule }       from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { PouchDBService } from './pouch-dbservice.service'
import { QuizreportComponent } from './quizreport/quizreport.component';
import {AddquizDialogComponent} from './quizcreator/addquiz-dialog/addquiz-dialog.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {path: '' , component: HeaderComponent},
  {path: 'report' , component: QuizreportComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    QuizreportComponent,
    AddquizDialogComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ChartsModule,
  ],
  providers: [PouchDBService],
  bootstrap: [AppComponent],
  entryComponents: [AddquizDialogComponent]
})
export class AppModule { }
