import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { WordsListComponent } from './admin/pages/words-list/words-list.component';
import { MainLayoutComponent } from './admin/pages/main-layout/main-layout.component';
import { AuthGuard } from './admin/auth/auth.guard';
import { WordUpsertComponent } from './admin/pages/word-upsert/word-upsert.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainLayoutComponent , canActivate: [AuthGuard], children:[
    { path: 'words', component: WordsListComponent },
    { path: 'words/:id', component: WordUpsertComponent },
    { path: '', redirectTo: 'words', pathMatch: 'full' },
  ] },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
