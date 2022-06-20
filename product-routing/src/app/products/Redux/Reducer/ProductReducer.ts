import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Prod } from "src/app/Interface/products";
import  * as ProductsAction from '../Actions/productAction'

export interface ProductState{
    showInstock:boolean
    products:Prod[]
    productID:string
    error:string
    message:string
}

const initialState:ProductState={
    showInstock:false,
    productID:'',
    products:[],
    error:'',
    message:''
}

const getProductFeatureState= createFeatureSelector<ProductState> ('products')

export const ShowInsStockState=createSelector(
    getProductFeatureState,
    state=>state.showInstock
)
export const getMessage=createSelector(
    getProductFeatureState,
    state=>state.message
)


export const productsSelector=createSelector(
    getProductFeatureState,
    state=>state.products
)

export const errorSelector=createSelector(
    getProductFeatureState,
    state=>state.error
)

export const idSelector=createSelector(
    getProductFeatureState,
    state=>state.productID
)

export const singleProductSelector=createSelector(
    getProductFeatureState,
    idSelector,
    (state, id)=>id? state.products.find(p=>p.id===id):null
)
export const ProductReducer=createReducer<ProductState>(
    initialState,on(
        ProductsAction.CheckInstock, (state):ProductState=>{            
            return{
                ...state,
                showInstock:!state.showInstock
            }
        }
    ),
    on(ProductsAction.SelectProduct, (state, action):ProductState=>{
                return{
                    ...state,
                    productID:action.id
                }    
           
    }),
    on(ProductsAction.loadProductsSuccess, (state,action):ProductState=>{
        return{
            ...state,
            products:action.products,
            error:''
            
        }
    }),

    on(ProductsAction.loadProductsFailure, (state,action):ProductState=>{
            return{
                ...state,
                error:action.error
            }
    }),

    on(ProductsAction.updateProductsSuccess, (state,action):ProductState=>{
        return{
                ...state,
                message:action.message.message
        }
    }),
    on(ProductsAction.updateProductsFailure, (state,action):ProductState=>{
        return{
            ...state,
            error:action.error
        }
    }),on(ProductsAction.createProductsSuccess, (state,action):ProductState=>{
            return{
                ...state,
                message:action.message.message
            }
    }),
    on(ProductsAction.createProductsFailure, (state,action):ProductState=>{
        return{
            ...state,
            error:action.error
        }
    })
    ,on(ProductsAction.deleteProductsSuccess    , (state,action):ProductState=>{
        return{
            ...state,
            products:state.products.filter(product=>product.id !==action.id),
            message:action.message.message
        }
    }),
    on(ProductsAction.deleteProductsFailure, (state,action):ProductState=>{
    return{
        ...state,
        error:action.error
    }
  })
    )
    
