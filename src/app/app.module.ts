import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsListComponent } from './admin/pages/words-list/words-list.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { tokenInterceptor } from './admin/auth/interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './admin/auth/interceptors/refresh-token.interceptors';
import { MainLayoutComponent } from './admin/pages/main-layout/main-layout.component';
import { HeaderComponent } from './admin/components/header/header.component';
import { CountCardsComponent } from './admin/components/count-cards/count-cards.component';
@NgModule({
  declarations: [
    AppComponent,
    WordsListComponent,
    LoginComponent,
    MainLayoutComponent,
    HeaderComponent,
    CountCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
