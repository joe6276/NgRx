import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeUserComponent } from '../home-user/home-user.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../Services/AuthGuard';
import { CanDeactivateGuard } from '../Services/DeactivateGuard';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './Redux/Reducer/ProductReducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './Redux/Effects/product-effect.service';



@NgModule({
  declarations: [
    AddProductComponent,
    ProductsComponent,
    ProductComponent,
    EditProductComponent,
    HomeUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EffectsModule.forFeature([ProductEffect]),
    StoreModule.forFeature('products',ProductReducer),
    RouterModule.forChild([
      {path:'' , children:[
        {path:'add',  component:AddProductComponent},
        {path:'products', canActivateChild:[AuthGuard], component:ProductsComponent, children:[
    
        {path:':id',  component:ProductComponent},
        {path:':id/edit',  component:EditProductComponent,
        canDeactivate:[CanDeactivateGuard]},
        {path:'', component:HomeUserComponent},
      ]},
      ]}
    ])
  ]
})
export class ProductsModule { }
