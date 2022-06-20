import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Interface/product';
import { Prod } from 'src/app/Interface/products';
import { ProductService } from 'src/app/Services/product.service';
import { idSelector, ProductState, singleProductSelector } from '../Redux/Reducer/ProductReducer';
import * as ProductActions from '../Redux/Actions/productAction'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
id!:string
product$!:Observable<Prod|null|undefined>
  constructor( private route:ActivatedRoute,  private store:Store<ProductState> , private router:Router ,private productService:ProductService) { }

  ngOnInit(): void {
      // //  this.id=this.route.snapshot.params['id']
      // //   this.product=this.productService.getProduct(this.id)
      // this.route.params.subscribe((params:Params)=>{
      //   this.id=params['id']
      //   this.product=this.productService.getProduct(this.id)
      // })
      this.store.select(idSelector).subscribe(
        id=>[
          this.id=id
        ]
      )

   this.product$=this.store.select(singleProductSelector)

  }
  edit(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'})
  }

  delete(){
    this.store.dispatch(ProductActions.deleteProduct({id:this.id}))
  }
}
