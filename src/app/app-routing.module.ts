import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIdeaComponent } from './components/add-idea/add-idea.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  {
    path: 'ideas',
    component: IdeasComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'add',
    component: AddIdeaComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'ideas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
