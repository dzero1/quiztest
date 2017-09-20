import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule }       from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { PouchDBService } from './pouch-dbservice.service'
import { McqComponent } from './component/mcq/mcq.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';



const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: { title: 'Login' }
  },
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full',
    data: { title: 'Login' }
  },
  {
    path: 'mcq/:username',
    component: McqComponent,
    pathMatch: 'full',
    data: { title: 'MCQ' }
  },
  //{ path: 'schoolpage/:school', component: SchoolpageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    McqComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [PouchDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
