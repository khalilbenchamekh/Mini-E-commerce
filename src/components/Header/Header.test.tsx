import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/cartContext/CartContext';
import Header from '.';


describe('Header Component', () => {
  test('renders correctly', () => {
    const mockCartContextValue = {
      state: {
        cartItems: [],
      },
      addToCart: jest.fn(),
    };

    const {container} = render(
      <MemoryRouter>
        <CartProvider value={mockCartContextValue}>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );
    const homeMenuItem = container.getElementsByClassName('MuiTypography-root MuiTypography-h5 MuiTypography-noWrap headerTitle css-1961ak2-MuiTypography-root');
    expect(homeMenuItem).toBeVisible;
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    const settingsButton = screen.getByRole('button', { name: /Open settings/i });
    expect(settingsButton).toBeInTheDocument();
  });

  test('opens and closes navigation menu', () => {
    const mockCartContextValue = {
      state: {
        cartItems: [],
      },
      addToCart: jest.fn(),
    };

    const {container}  = render(
      <MemoryRouter>
        <CartProvider value={mockCartContextValue}>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText('account of current user');
    fireEvent.click(menuButton);
    const homeMenuItem = container.getElementsByClassName('MuiTypography-root MuiTypography-h5 MuiTypography-noWrap headerTitle css-1961ak2-MuiTypography-root');
    expect(homeMenuItem).toBeVisible;
  });

  test('redirects to cart page on clicking cart icon', () => {
    const mockCartContextValue = {
      state: {
        cartItems: [],
      },
      addToCart: jest.fn(),
    };

    const { container } = render(
      <MemoryRouter>
        <CartProvider value={mockCartContextValue}>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );

    const cartIconButton = screen.getByLabelText('cart items');
    fireEvent.click(cartIconButton);
    expect(container.innerHTML).toContain('Remy Sharp');
  });
});
