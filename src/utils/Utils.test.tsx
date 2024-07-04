
import { CartItem } from "../context/cartContext/CartContext";
import { Product } from "../types";
import DataStatic from "./DataStatic";
import { calculateTotalPrice, 
    fetchCartItemsFromLocalStorage, 
    deleteCartItemFromLocalStorage, 
    modifyCartItemInLocalStorageById, 
    fetchCategoriesFromDataStatic, 
    fetchDataFromLocalStorage, 
    mainProcessCategories 
} from "."; // Replace 'yourModuleName' with the actual module name

describe('Utility Functions', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('calculateTotalPrice should calculate total price correctly', () => {
        const price = 10;
        const quantity = 2;
        expect(calculateTotalPrice(price, quantity)).toBe(20);
    });

    test('fetchCartItemsFromLocalStorage should return cart items from localStorage', () => {
        const mockCartItems: any = [
            { id: 1, product: { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 }, quantity: 2 }
        ];
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

        const result = fetchCartItemsFromLocalStorage();
        expect(result).toEqual(mockCartItems);
    });

    test('fetchCartItemsFromLocalStorage should return empty array if no cart items in localStorage', () => {
        const result = fetchCartItemsFromLocalStorage();
        expect(result).toEqual([]);
    });

    test('deleteCartItemFromLocalStorage should remove item from localStorage', () => {
        const mockCartItems: any = [
            { id: 1, product: { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 }, quantity: 2 },
            { id: 2, product: { id: 2, title: 'Product 2', image: 'img2.jpg', price: 15 }, quantity: 1 }
        ];
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

        deleteCartItemFromLocalStorage(1);
        const remainingItems = fetchCartItemsFromLocalStorage();
        expect(remainingItems).toHaveLength(1);
        expect(remainingItems[0].id).toBe(2);
    });

    test('modifyCartItemInLocalStorageById should update item in localStorage', () => {
        const mockCartItems: any = [
            { id: 1, product: { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 }, quantity: 2 }
        ];
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

        const updatedCartItem: Partial<CartItem> = { quantity: 3 };
        modifyCartItemInLocalStorageById(1, updatedCartItem);

        const updatedItems = fetchCartItemsFromLocalStorage();
        expect(updatedItems[0].quantity).toBe(3);
    });

    test('fetchCategoriesFromDataStatic should fetch categories from static data', async () => {
        DataStatic.categosData = Promise.resolve(['Category 1', 'Category 2']);
        const result = await fetchCategoriesFromDataStatic();
        expect(result).toEqual(['Category 1', 'Category 2']);
    });

    test('fetchDataFromLocalStorage should return cart data from localStorage', () => {
        const mockCartItems: any = [
            { id: 1, product: { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 }, quantity: 2 }
        ];
        localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

        const result = fetchDataFromLocalStorage();
        expect(result).toEqual(mockCartItems);
    });

    test('fetchDataFromLocalStorage should return empty array if no data in localStorage', () => {
        const result = fetchDataFromLocalStorage();
        expect(result).toEqual([]);
    });

    test('mainProcessCategories should fetch categories from static data if available', async () => {
        DataStatic.categosData = Promise.resolve(['Static Category 1', 'Static Category 2']);
        const result = await mainProcessCategories([]);
        expect(result).toEqual(['Static Category 1', 'Static Category 2']);
    });
});
