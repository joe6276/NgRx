import { createAction, props } from "@ngrx/store";
import { CreateProduct, Prod } from "src/app/Interface/products";
import { ProductSuccess } from "src/app/Interface/Productsucess";



export const CheckInstock=createAction(
    'CHECK_INSTOCK'
)

export const SelectProduct=createAction(
    'SELECTED-PRODUCT',
    props<{id:string}>()
)


export const loadProducts= createAction(
    'Load_product'
)
export const loadProductsSuccess= createAction(
    'Load_product_Success',
    props<{products:Prod[]}>()
)

export const loadProductsFailure= createAction(
    'Load_product_failure',
    props<{error:string}>()
)




export const updateProduct= createAction(
    'update_product',
    props<{product:Prod}>()
)

export const updateProductsSuccess= createAction(
    'update_product_Success',
    props<{message:ProductSuccess}>()
)
export const updateProductsFailure= createAction(
    'update_product_failure',
    props<{error:string}>()
)


export const createProduct= createAction(
    'create_product',
    props<{product:CreateProduct}>()
)
export const createProductsSuccess= createAction(
    'create_product_Success',
    props<{message:ProductSuccess}>()
)
export const createProductsFailure= createAction(
    'create_product_failure',
    props<{error:string}>()
)


export const deleteProduct= createAction(
    'delete_product',
    props<{id:string}>()
)
export const deleteProductsSuccess= createAction(
    'delete_product_Success',
    props<{message:ProductSuccess, id:string}>()
)
export const deleteProductsFailure= createAction(
    'delete_product_failure',
    props<{error:string}>()
)