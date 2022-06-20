import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from '../Services/product.service';
import { errorSelector, productsSelector, ProductState,  ShowInsStockState } from './Redux/Reducer/ProductReducer';
import * as ProductACtions from '../products/Redux/Actions/productAction'
import { Prod } from '../Interface/products';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$!:Observable<Prod[]>
  instock!:boolean
  
  error$!:Observable<string>
  constructor(private productService:ProductService, private store:Store<ProductState>, private router:Router) { }

  ngOnInit(): void {
    this.store.dispatch(ProductACtions.loadProducts())
    this.products$=this.store.select(productsSelector)
    this.error$= this.store.select(errorSelector)

    
    this.store.select(ShowInsStockState).subscribe(showInstock=>{
    this.instock= showInstock
})
  }
  onChange(){
    // this.instock=!this.instock
    this.store.dispatch(ProductACtions.CheckInstock())

  }
  onSelect(id:string ){
    this.store.dispatch(ProductACtions.SelectProduct({id}))
    this.router.navigate(['p','products', id])
    }

}
