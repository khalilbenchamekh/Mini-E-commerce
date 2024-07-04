import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/cartContext/CartContext'; // Adjust path as needed
import ShoppingCartPage from './index';


describe('ShoppingCartPage Component', () => {
  test('renders cart items correctly', async () => {
    await act(async () => {
      // Mock cart items
      const mockCartItems = [
        {
          id: 1,
          product: {
            id: 1,
            title: 'Test Product',
            image: 'test.jpg',
            price: 10,
          },
          quantity: 2,
        },
        {
          id: 2,
          product: {
            id: 2,
            title: 'Another Product',
            image: 'another.jpg',
            price: 15,
          },
          quantity: 1,
        },
      ];

      // Mock CartProvider with mockCartItems
      const mockProviderProps: any = {
        children: <ShoppingCartPage />,
        value: {
          state: {
            cartItems: mockCartItems,
          },
          dispatch: jest.fn(),
        },
      };

      const {container} = render(
        <MemoryRouter>
          <CartProvider value={mockCartItems}>
            {mockProviderProps.children}
          </CartProvider>
        </MemoryRouter>
      );

      const productTitle = container.getElementsByClassName('MuiTypography-root')
      expect(productTitle).toBeVisible

    })
  });

  test('renders cart items uncorrectly', async () => {
    await act(async () => {
      // Mock cart items
      const mockCartItems: any = [];

      // Mock CartProvider with mockCartItems
      const mockProviderProps: any = {
        children: <ShoppingCartPage />,
        value: {
          state: {
            cartItems: mockCartItems,
          },
          dispatch: jest.fn(),
        },
      };

      const {container} = render(
        <MemoryRouter>
          <CartProvider value={mockCartItems}>
            {mockProviderProps.children}
          </CartProvider>
        </MemoryRouter>
      );
      expect(container.getElementsByClassName('MuiTableCell-root')).not.toBeVisible;
    })
  })
})
