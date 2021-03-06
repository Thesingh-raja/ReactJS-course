import {useReducer} from 'react'
import CartContext from "./cart-context";

const defaultCartState={
    items:[],
    totalAmount:0,

}
const cartReducer=(state,action)=>{
    if(action.type==='ADD')
    {
        console.log(action,state)
        const updatedTotalAmount=state.totalAmount + action.item.price * 1
        const existingCartItemIndex= state.items.findIndex(item=> item.id===action.item.id)
        const existingCartItem=state.items[existingCartItemIndex];
        let updatedItem
        let updatedItems
        
        if(existingCartItem)
        {
        updatedItem={
            ...existingCartItem,
            amount:existingCartItem.amount + 1
        }
        updatedItems=[...state.items];
        updatedItems[existingCartItemIndex]= updatedItem
    }
    else{
        
        updatedItems=state.items.concat(action.item)
    }
    return{
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
}

if(action.type==='REMOVE')
{
    console.log(state.items)
    console.log(action)

    const existingCartItemIndex= state.items.findIndex(item=> item.id===action.id)
    const existingItem=state.items[existingCartItemIndex]
    const updatedTotalAmount=state.totalAmount-existingItem.price;
    let updatedItems;
    if(existingItem.amount===1)
    {
        updatedItems= state.items.filter(item=>item.id!==action.id)
    }
    else{
        const updatedItem={...existingItem,amount:existingItem.amount - 1};
        updatedItems=[...state.items]
        updatedItems[existingCartItemIndex]=updatedItem;
    }
    return {
        items:updatedItems,
        totalAmount:updatedTotalAmount
    }
}
    return defaultCartState
}
const CartProvider=props=>
{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState)
    const addItemToCartHandler=item=>{ dispatchCartAction({type:'ADD',item:item})}
    const RemoveItemToCartHandler=id=>{dispatchCartAction({type:'REMOVE',id:id})}
    
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:RemoveItemToCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;