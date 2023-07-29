import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { WordsListComponent } from './admin/pages/words-list/words-list.component';
import { MainLayoutComponent } from './admin/pages/main-layout/main-layout.component';
import { AuthGuard } from './admin/auth/auth.guard';
import { WordUpsertComponent } from './admin/pages/word-upsert/word-upsert.component';
import {CustomerLayoutComponent} from "./customer/pages/customer-layout/customer-layout.component";
import {HomeComponent} from "./customer/pages/home/home.component";
import {NotFoundComponent} from "./customer/pages/not-found/not-found.component";
import { AboutUsComponent } from './customer/pages/about-us/about-us.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'customer', component: CustomerLayoutComponent, children:[
      {path: 'home', component: HomeComponent},
      {path: 'about-us', component: AboutUsComponent},
      { path: '404', component: NotFoundComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ] },
  { path: 'main', component: MainLayoutComponent , canActivate: [AuthGuard], children:[
    { path: 'words', component: WordsListComponent },
    { path: 'words/:id', component: WordUpsertComponent },
    { path: '', redirectTo: 'words', pathMatch: 'full' },
  ] },
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
