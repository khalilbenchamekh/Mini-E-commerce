import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext/ProductsContext';
import { CartProvider } from './context/cartContext/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import NotFoundPage from './pages/NotFoundPage';


const App=() => {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<ShoppingCartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;