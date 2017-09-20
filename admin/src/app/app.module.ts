import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule }       from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { QuizcreatorComponent } from './quizcreator/quizcreator.component';
import { QuizreportComponent } from './quizreport/quizreport.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';

const appRoutes: Routes = [
  {
    path: 'quizcreator',
    component: QuizcreatorComponent,
    pathMatch: 'full',
    data: { title: 'quizcreator' }
  },
  {path: 'report' , component: QuizreportComponent},
  //{ path: 'schoolpage/:school', component: SchoolpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    QuizcreatorComponent,
    QuizreportComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
