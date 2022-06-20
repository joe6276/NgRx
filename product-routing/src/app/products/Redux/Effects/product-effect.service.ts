import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import * as ProductActions from '../Actions/productAction'
@Injectable({
  providedIn: 'root'
})
export class ProductEffect{

  constructor( private action$ :Actions , private productService:ProductsService) { }

  loadProduct= createEffect(()=>{
    return this.action$.pipe(

      ofType(ProductActions.loadProducts),
      mergeMap(()=> this.productService.getProducts().pipe(
        map(products=>ProductActions.loadProductsSuccess({products})),
        catchError(error=>of(ProductActions.loadProductsFailure({error})))
    )
    )
    )
  })

  updateProduct=createEffect(()=>{
    return this.action$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap(action=>
          this.productService.updateProduct(action.product).pipe(
            map(product=>ProductActions.updateProductsSuccess({message:product})),
            catchError(error=>of(ProductActions.updateProductsFailure({error})))
          )
      )
    )
  })


  createProduct= createEffect(()=>{
    return this.action$.pipe(
      ofType(ProductActions.createProduct),
      concatMap(action=>
        this.productService.createProduct(action.product).pipe(
          map(message=> ProductActions.createProductsSuccess({message}))
          ,
        catchError(error=>of(ProductActions.createProductsFailure({error})))
        )
        )
    )
  })

  deleteProduct= createEffect(()=>{
    return this.action$.pipe(
      ofType(ProductActions.deleteProduct),
      concatMap(action=>
        this.productService.deleteProduct(action.id).pipe(
          map(message=> ProductActions.deleteProductsSuccess({message,id:action.id}))
          ,
        catchError(error=>of(ProductActions.deleteProductsFailure({error})))
        )
        )
    )
  })
}
