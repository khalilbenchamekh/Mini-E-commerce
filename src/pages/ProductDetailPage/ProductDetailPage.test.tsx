import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './index';
import { ProductsContext } from '../../context/ProductsContext/ProductsContext';

const mockProducts = [
  {
    id: '1',
    title: 'Test Product',
    description: 'This is a test product.',
    image: 'test-image.jpg',
    price: 20,
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
];

// Mock ProductsContext value
const mockProductsContextValue = {
  state: {
    products: mockProducts,
    loading: false,
    error: null,
  },
  dispatch: jest.fn(),
};


describe('ProductDetailPage Component', () => {
  test('renders product details correctly', async () => {
    await act(()=>{
const mockProviderProps: any = {
      children: <ProductDetailPage />,
      value: {
        state: {
          cartItems: mockProducts,
        },
        dispatch: jest.fn(),
      },
    };
    const { container } = render(
      <MemoryRouter initialEntries={['/product/1']}>
        <ProductsContext.Provider value={mockProductsContextValue}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </ProductsContext.Provider>
      </MemoryRouter>
    );

      mockProducts.forEach(item => {
        const productTitle = container.getElementsByClassName('MuiTypography-root');

        expect(productTitle).toBe
      })
    })
    
    
  });

  test('handles product not found', async () => {
    
      const mockProductsNotFound:any = [];
      const mockProductsContextValue = {
        state: {
          cartItems: mockProductsNotFound,
        },
        dispatch: jest.fn(),
      };
  
      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/product/1']}>
            <ProductsContext.Provider value={mockProductsContextValue}>
              <ProductDetailPage />
            </ProductsContext.Provider>
          </MemoryRouter>
        );
      });
  
      // Assert that "Product not found!" message is rendered
      const notFoundMessage = screen.getByText(/Product not found/i); // Using regex for case-insensitive matching
      expect(notFoundMessage).toBeInTheDocument();
    });
});
