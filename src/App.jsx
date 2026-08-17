import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import Custom from './pages/Custom';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import { EnquiryProvider } from './context/EnquiryContext';
import './products.css';
import './pages.css';

export default function App() {
  return (
    <EnquiryProvider>
      <ScrollToTop />
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categorySlug" element={<ProductsPage />} />
          <Route path="/products/:categorySlug/:variantSlug" element={<ProductsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<LegalPage page="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </EnquiryProvider>
  );
}
