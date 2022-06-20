import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Services/AuthGuard';
import { CustomLoadingService } from './Services/custom-loading.service';
// import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';

const routes: Routes = [
{path:'' ,component:HomeComponent}, 

{path:'p' , canLoad:[AuthGuard],data:{allowed:true} ,loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)}
//  {path:'notfound', component:PagenotFoundComponent},
//  {path:'**', redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:CustomLoadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
