import { NgModule } from '@angular/core' ;
import { Routes , RouterModule } from '@angular/router' ;
import {HomeComponent} from "./home/home.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingListsComponent} from "./shopping-lists/shopping-lists.component";
import {ShoppingListDetailComponent} from "./shopping-list-detail/shopping-list-detail.component";
import {ShoppingListFormComponent} from "./shopping-list-form/shopping-list-form.component";

const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:id', component: ShoppingListDetailComponent},
  {path: 'lists', component: ShoppingListsComponent},
  {path: 'lists/:id', component: ShoppingListDetailComponent},
  {path: 'admin', component: ShoppingListFormComponent},
  {path: 'admin/:id', component: ShoppingListFormComponent},

];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
