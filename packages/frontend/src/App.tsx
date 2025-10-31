import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import PromotionsPage from './pages/PromotionsPage';
import BlogPage from './pages/BlogPage';
import DeliveryPage from './pages/DeliveryPage';
import WishlistPage from './pages/WishlistPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
