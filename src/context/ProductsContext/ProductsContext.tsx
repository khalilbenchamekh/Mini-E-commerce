import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import {  ProductsState } from '../../types';
import Env from '../../utils/Env';

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

const ProductsContext = createContext<{
    state: ProductsState | any;
    dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const productsReducer = (state: ProductsState, action: any): ProductsState => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const ProductsProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
            try {
                const url = await Env.envCall();
                const response = await fetch(url);
                const products = await response.json();
                dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
            } catch (error: any) {
                dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
