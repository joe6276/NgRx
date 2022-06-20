import { Injectable } from '@angular/core';
import { Product } from '../Interface/product';
import {v4 as uid} from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products:Product[]=[
  {
    id:'1f9f3152-d141-4b46-a791-c3e25fd31f0e',
    name:'Laptop',
    description:'Jitu  CORE 15-10TH GEN, 8GB RAM, 512GB SSD, 4GB GRAPHICS, 15.6 FHD, LAPTOP',
    image:'https://cdn.pixabay.com/photo/2012/04/13/20/24/laptop-33521__340.png',
    price:128000,
    role:'user',
    instore:3
    
  },
  {
    id:'65224028-27ab-43b6-b180-3a94f6d2f43f',
    name:'Monitor',
    description:'Jitu Ultra Gaming Monitor',
    image:'https://cdn.pixabay.com/photo/2013/07/12/15/04/monitor-149362__340.png',
    price:250000,
    role:'user',
    instore:2
  },
  {
    id:'587c0025-2408-4a87-9568-0f363a4c6544',
    name:'Mouse',
    description:'Jitu Wired Mouse with 2.4 Ghz Nano USB Receiver, 1600DPI',
    image:'https://cdn.pixabay.com/photo/2013/07/13/12/38/computer-mouse-160032__340.png',
    price:8000,
    role:'admin',
    instore:4
  },
  {
    id:'68b62150-9935-475a-9afa-f7c79b6e911d',
    name:'KeyBoard',
    description:'Jitu Wired Keyboard ',
    image:'https://cdn.pixabay.com/photo/2013/07/13/14/06/keyboard-162134_960_720.png',
    price:128000,
    role:'admin',
    instore:6
  }
  ]

  constructor() { }

addProduct(name:string,description:string,price:number){
  this.products.push({
    id:uid(),
    name,description,price,
    image:'https://cdn.pixabay.com/photo/2013/07/13/14/06/keyboard-162134_960_720.png',
    role:'user',
    instore:3
  })
}

getAllProducts(){
  return this.products
}

getProduct(id:string){
  return this.products.find(product=>product.id===id)
}

deleteProduct(id:string){
  const index= this.products.findIndex(product=>product.id===id)
  return this.products.splice(index,1)
}
updateProduct(id:string, newname:string,newdescription:string, newprice:number){
  const product= this.getProduct(id)
  if(product){
    product.name= newname
    product.description=newdescription
    product.price= newprice
  }
}

log(){
  console.log(uid());
  
}
}
