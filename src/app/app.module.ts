import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
//import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
//import { FirstCharUppercasPipe } from './pipes/first-char-uppercas.pipe';
//import { UppercaseInputDirective } from './directives/uppercase-input.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //DashboardComponent,
    HomeComponent,
   // FirstCharUppercasPipe,
    //UppercaseInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
   AngularFireStorageModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
