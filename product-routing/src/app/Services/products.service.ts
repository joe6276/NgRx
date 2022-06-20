import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,  Observable, throwError } from 'rxjs';
import { CreateProduct, Prod } from '../Interface/products';
import { ProductSuccess } from '../Interface/Productsucess';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
getURl="http://localhost:8000/products"
  constructor( private http:HttpClient ) { }

  getProducts():Observable<Prod[]>{
   return this.http.get<Prod[]>(this.getURl).pipe(
    catchError(err=> this.handleError(err))
   )
  }

  updateProduct(product:Prod){
    const {id, ...rest}=product
    return this.http.patch<ProductSuccess>(`http://localhost:8000/products/update/${id}`,rest).pipe(
      catchError(err=> this.handleError(err))
    )
  }

  createProduct(product:CreateProduct){
    return this.http.post<ProductSuccess>(`http://localhost:8000/products/create`,product).pipe(
      catchError(err=> this.handleError(err))
    )
  }

  deleteProduct(id:string){
    return this.http.delete<ProductSuccess>(`http://localhost:8000/products/delete/${id}`).pipe(
      catchError(err=> this.handleError(err))
    )
  }



private handleError(err: any) {
    let errorMessage= `An error Occured : ${err.message}`
    return throwError(errorMessage);
  }
}


