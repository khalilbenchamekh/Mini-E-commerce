import { CartItem } from "../context/cartContext/CartContext";
import { Product } from "../types";
import DataStatic from "./DataStatic";

export const calculateTotalPrice = (price: number, quantity: number) => {
    return price * quantity;
};

export const fetchCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        const json: CartItem[] = JSON.parse(cartItems);
        return json;
    }
    return [];
};

export const deleteCartItemFromLocalStorage = (id: number): void => {
    const items = fetchCartItemsFromLocalStorage();
    if (Array.isArray(items)) {
        const updatedCartItems = items.filter(item => item.id !== id);

        // Update the local storage with the new cart items array
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        console.log(`Removed item with id ${id} from cart.`);
    }
};

export const modifyCartItemInLocalStorageById = (id: number, updatedCartItem: Partial<CartItem>) => {
     // Get existing cart items from localStorage
     const existingCartItemsJSON = localStorage.getItem('cartItems');
     if (!existingCartItemsJSON) {
         return; // If no cart items exist in localStorage, exit early
     }
 
     // Parse cart items from JSON string in localStorage
     const existingCartItems: CartItem[] = JSON.parse(existingCartItemsJSON);
 
     // Find the index of the cart item with the specified id
     const index =()=> existingCartItems.findIndex(item => item.id === id);
     
     if (index() === -1) {
         return; // If no cart item with the specified id is found, exit early
     }  
     
     // Update the found cart item with the updatedCartItem properties
     existingCartItems[index()] = {
         ...existingCartItems[index()], // Preserve existing properties
         ...updatedCartItem, // Apply updated properties
     };
 
     // Update localStorage with the modified cart items
     localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
};

export const fetchCategoriesFromDataStatic = async () => {
    if (!DataStatic.categosData) {
        DataStatic.categosData = new Promise<string[]>(async (resolve, reject) => {
            try {
                const response = await fetch('/data.json');
                const config = await response.json();
                resolve(config.categos);
            } catch (error) {
                reject(error);
            }
        });
    }
    return DataStatic.categosData;
}

export const fetchDataFromLocalStorage = () => {
    let data: CartItem[] = [];
    const cartItemsLocalStorage = localStorage.getItem('cartItems');
    if (cartItemsLocalStorage) {
        const parsedCartItems: CartItem[] = JSON.parse(cartItemsLocalStorage);
        if (parsedCartItems.length > 0) {
            data = parsedCartItems;
        }
    }
    return data;
};

const extractUniqueCategories = (products: Product[]): string[] => {
    const categories = products.map(product => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    return uniqueCategories;
};

export const mainProcessCategories = async (products: Product[]) => {
    let result;
    
    const dataCategories = await fetchCategoriesFromDataStatic();
    if (dataCategories && dataCategories.length > 0) {
        result = dataCategories;
    } else {
        result = extractUniqueCategories(products);
    }
    return result;
};
