import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule }       from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { QuizcreatorComponent } from './quizcreator/quizcreator.component';
import { QuizreportComponent } from './quizreport/quizreport.component';
import {AddquizDialogComponent} from './quizcreator/addquiz-dialog/addquiz-dialog.component';

const appRoutes: Routes = [
  {
    path: 'quizcreator',
    component: QuizcreatorComponent,
    pathMatch: 'full',
    data: { title: 'quizcreator' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QuizcreatorComponent,
    QuizreportComponent,
    AddquizDialogComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddquizDialogComponent]
})
export class AppModule { }
