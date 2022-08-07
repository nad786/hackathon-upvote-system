import { RouteGuard } from './route.guard';
import { LoginComponent } from './login/login.component';
import { AddIdeaComponent } from './add-idea/add-idea.component';
import { IdeasComponent } from './ideas/ideas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
