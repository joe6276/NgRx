import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Interface/product';
import { Prod } from 'src/app/Interface/products';
import { CanComponentDeactivate } from 'src/app/Services/DeactivateGuard';
import { ProductService } from 'src/app/Services/product.service';
import { idSelector, ProductState, singleProductSelector } from '../Redux/Reducer/ProductReducer';
import * as productAction from '../Redux/Actions/productAction'
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit,CanComponentDeactivate {
  allowedit:boolean=false;
  isinvalid=false
  productname=''
   productdescription=''
    price=0
    product?:Product
    id!:string
    changed:boolean=false
  constructor(private store:Store<ProductState>, private route:ActivatedRoute, private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params:Params)=>{
    //     this.id=params['id']
    //     this.product= this.productService.getProduct(this.id)
    //     if(this.product){
    //       this.productname=this.product.name,
    //       this.productdescription=this.product.description
    //       this.price= this.product.price
    //     }
    // })
   this.store.select(idSelector).subscribe(id=>{
    this.id=id
   })
    this.store.select(singleProductSelector).subscribe(products=>{
      if(products){
        this.productname=products.product_name,
        this.productdescription=products.product_desc
        this.price= products.price
      }
     })
  }

  canDeactivate (): boolean | Observable<boolean> | Promise<boolean>{
   if(!this.allowedit){
     return true
   }
     if((this.productname!==this.product?.name || this.productdescription!==this.product.description ||
      this.price!== this.product.price
      ) && !this.changed){
        return confirm('Do you Want to Discard the Changes??')
      }else{
        return true
      }

      
   
  }
  editProduct(){
    if(this.productname.length===0 || this.productdescription.length===0 || this.price<=0){
      this.isinvalid=true
    }
    this.changed=true
    // this.productService.updateProduct( this.id, this.productname,this.productdescription,this.price)

     const product:Prod ={ id:this.id, 
      product_name: this.productname,
       product_desc:this.productdescription,
        price:this.price}

       this.store.dispatch(productAction.updateProduct({product}))
       this.router.navigate(['/p/products'])
  }
  

}
