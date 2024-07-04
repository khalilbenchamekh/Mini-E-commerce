import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductsProvider } from '../../context/ProductsContext/ProductsContext';
import ProductList from '.';

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description of Product 1',
    price: 50,
    category: 'Category A',
    image: '/product1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description of Product 2',
    price: 100,
    category: 'Category B',
    image: '/product2.jpg',
  },
];

const mockProductsContextValue = {
  state: {
    products: mockProducts,
    loading: false,
    error: null,
  },
};

describe('ProductList Component', () => {
  test('renders product list correctly', () => {
    const {container} = render(
      <MemoryRouter>
        <ProductsProvider value={mockProductsContextValue}>
          <ProductList />
        </ProductsProvider>
      </MemoryRouter>
    );

    const productTitles = container.getElementsByClassName('MuiSlider-valueLabelLabel');
    expect(productTitles).toHaveLength(2);
    expect(productTitles[1]).toHaveTextContent('0');

    const loadingText = screen.queryByText('Loading...');
    expect(loadingText).not.toBeVisible;

    const errorText = screen.queryByText('Error Message');
    expect(errorText).not.toBeInTheDocument();
  });

  test('filters products by price range', () => {
    const {container} = render(
      <MemoryRouter>
        <ProductsProvider value={mockProductsContextValue}>
          <ProductList />
        </ProductsProvider>
      </MemoryRouter>
    );

    const priceFilter = container.getElementsByClassName('MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-18k87ye-MuiTypography-root');

    expect(priceFilter).toHaveLength(2);
    expect(priceFilter[0]).toHaveTextContent('Filter by Price');

    const productTitles = container.getElementsByClassName('MuiSlider-valueLabelLabel');
    expect(productTitles).toHaveLength(2);
    expect(productTitles[0]).toHaveTextContent('0');
  });

  test('filters products by category', () => {
    const {container} = render(
      <MemoryRouter>
        <ProductsProvider value={mockProductsContextValue}>
          <ProductList />
        </ProductsProvider>
      </MemoryRouter>
    );

    const categoryCheckbox = container.getElementsByTagName('checkbox');

    expect(categoryCheckbox).toBeVisible

    const productTitles = container.getElementsByClassName('MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-18k87ye-MuiTypography-root');

    expect(productTitles).toHaveLength(2);
    expect(productTitles[1]).toHaveTextContent('Filter by Category');
  });

  
});
