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
import { WordUpsertComponent } from './admin/pages/word-upsert/word-upsert.component';
import { DropdownComponent } from './admin/components/dropdown/dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectComponent } from './admin/components/multiselect/multiselect.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { CreateWordComponent } from './admin/components/create-word/create-word.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TerminDropComponent } from './admin/components/termin-drop/termin-drop.component';
import { TerminUpsertComponent } from './admin/components/termin-upsert/termin-upsert.component';
import { HomeComponent } from './customer/pages/home/home.component';
import { CustomerLayoutComponent } from './customer/pages/customer-layout/customer-layout.component';
import { NotFoundComponent } from './customer/pages/not-found/not-found.component';
import { CustomerHeaderComponent } from './customer/components/customer-header/customer-header.component';
import { AboutUsComponent } from './customer/pages/about-us/about-us.component';
import { CustomerFooterComponent } from './customer/components/customer-footer/customer-footer.component';
@NgModule({
  declarations: [
    AppComponent,
    WordsListComponent,
    LoginComponent,
    MainLayoutComponent,
    HeaderComponent,
    CountCardsComponent,
    WordUpsertComponent,
    DropdownComponent,
    MultiselectComponent,
    CreateWordComponent,
    TerminDropComponent,
    TerminUpsertComponent,
    HomeComponent,
    CustomerLayoutComponent,
    NotFoundComponent,
    CustomerHeaderComponent,
    AboutUsComponent,
    CustomerFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    DynamicDialogModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
