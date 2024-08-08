import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './componenets/user/user.component';
import { CreateUserComponent } from './componenets/create-user/create-user.component';
import { UpdateUserComponent } from './componenets/update-user/update-user.component';
import { DeleteUserComponent } from './componenets/delete-user/delete-user.component';
import { ChartsComponent } from './componenets/charts/charts.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'delete-user/:id', component: DeleteUserComponent },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
