import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreateProduct, Prod } from 'src/app/Interface/products';
import { ProductService } from '../../Services/product.service';
import { getMessage, ProductState } from '../Redux/Reducer/ProductReducer';
import * as ProductActions from '../Redux/Actions/productAction'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
isinvalid:boolean=false
success$!:Observable<string>
  constructor( private store:Store<ProductState> ,private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.success$=this.store.select(getMessage)
  }
  addProduct(name:string, description:string, price:number){
    if(name.length===0 || description.length===0 || price<=0){
      this.isinvalid=true
      setTimeout(()=>{
        this.isinvalid=false
      },5000)
    }
    else{
      // this.productService.addProduct(name,description,price)
      const product:CreateProduct={
          product_name:name,
          product_desc:description,
          price
      }
      this.store.dispatch(ProductActions.createProduct({product}))
      
      // this.router.navigate(['/p/products'])
    }
  }
}
