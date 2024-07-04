import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../../types';
import { fetchCartItemsFromLocalStorage, modifyCartItemInLocalStorageById } from '../../utils';


export interface CartItem {
    id: number,
    product: Product;
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
}

export enum CartActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY',
    DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY',
}

interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: {
        cart: CartItem
    };
}

interface RemoveFromCartAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    payload: {
        cart: CartItem;
    };
}

interface IncrementItemQuantityAction {
    type: CartActionTypes.INCREMENT_ITEM_QUANTITY;
    payload: {
        cart: CartItem;
    };
}

interface DecrementItemQuantityAction {
    type: CartActionTypes.DECREMENT_ITEM_QUANTITY;
    payload: {
        cart: CartItem;
    };
}

type CartAction =
    | AddToCartAction
    | RemoveFromCartAction
    | IncrementItemQuantityAction
    | DecrementItemQuantityAction;

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    addToCart: (item: {
        cart: CartItem;
    }) => void;
    removeFromCart: (item: {
        cart: CartItem;
    }) => void;
    incrementItemQuantity: (item: {
        cart: CartItem;
    }) => void;
    decrementItemQuantity: (item: {
        cart: CartItem;
    }) => void;
}>({
    state: { cartItems: [] },
    dispatch: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    incrementItemQuantity: () => { },
    decrementItemQuantity: () => { },
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload.cart],
            };
        case CartActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.cart.id),
            };
        case CartActionTypes.INCREMENT_ITEM_QUANTITY:

            const { id } = action.payload.cart;
            const currentCartItems = fetchCartItemsFromLocalStorage() || [];
            const updatedCartItems = currentCartItems.map(item =>
                item.id === id ? action.payload.cart : item
            );
            modifyCartItemInLocalStorageById(id, { quantity: action.payload.cart.quantity });

            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case CartActionTypes.DECREMENT_ITEM_QUANTITY:
            const cart = action.payload.cart;
            const currentDeCartItems = fetchCartItemsFromLocalStorage() || [];
            const updatedDeCartItems = currentDeCartItems.map(item =>
                item.id === cart.id ? action.payload.cart : item
            );

            modifyCartItemInLocalStorageById(cart.id, { quantity: action.payload.cart.quantity });

            return {
                ...state,
                cartItems: updatedDeCartItems,
            };

        default:
            return state;
    }
};
export const CartProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    const addToCart = (item: {
        cart: CartItem
    }) => {
        dispatch({ type: CartActionTypes.ADD_TO_CART, payload: item });
    };

    const removeFromCart = (item: {
        cart: CartItem;
    }) => {
        dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: item });
    };

    const incrementItemQuantity = (item: {
        cart: CartItem;
    }) => {
        dispatch({ type: CartActionTypes.INCREMENT_ITEM_QUANTITY, payload: item });
    };

    const decrementItemQuantity = (item: {
        cart: CartItem;
    }) => {
        dispatch({ type: CartActionTypes.DECREMENT_ITEM_QUANTITY, payload: item });
    };

    return (
        <CartContext.Provider
            value={{
                state,
                dispatch,
                addToCart,
                removeFromCart,
                incrementItemQuantity,
                decrementItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
