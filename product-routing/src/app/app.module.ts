import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { AuthGuard } from './Services/AuthGuard';
import { AuthService } from './Services/Auth';
import { CanDeactivateGuard } from './Services/DeactivateGuard';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagenotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({name: 'PRODUCT', maxAge: 25, logOnly: environment.production }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [AuthGuard,AuthService,CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
