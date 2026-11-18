import { useState } from 'react';
import { Navbar, type PageView } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ProductsView, type CartItem } from './components/ProductsView';
import { BuildQuoteView } from './components/BuildQuoteView';
import {
  ShippingPolicyView,
  ReshipmentPolicyView,
  FaqView,
  ContactView,
} from './components/PolicyViews';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FirebaseProvider } from './contexts/FirebaseContext';
import type { CategoryId, CurrencyCode, PackOption, Product } from './data/catalog';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const navigateTo = (page: PageView) => {
    if (page === 'products' && currentPage !== 'products') {
      setSelectedCategory('all');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentPage !== 'products') {
      setSelectedCategory('all');
      setCurrentPage('products');
    }
  };

  const handleSelectCategory = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, pack: PackOption) => {
    const key = `${product.id}::${pack.label}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          productName: product.name,
          generic: product.generic,
          manufacturer: product.manufacturer,
          packLabel: pack.label,
          unitPrice: pack.price,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <FirebaseProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => navigateTo('quote')}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onSelectCategory={handleSelectCategory}
            onNavigate={navigateTo}
            onOpenCart={() => navigateTo('quote')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsView
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenCart={() => navigateTo('quote')}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        )}

        {currentPage === 'quote' && (
          <BuildQuoteView
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={navigateTo}
            currency={currency}
          />
        )}

        {currentPage === 'shipping' && <ShippingPolicyView onNavigate={navigateTo} />}

        {currentPage === 'reshipment' && <ReshipmentPolicyView onNavigate={navigateTo} />}

        {currentPage === 'faq' && <FaqView onNavigate={navigateTo} />}

        {currentPage === 'contact' && <ContactView />}
      </main>

      <Footer
        onNavigate={navigateTo}
        onOpenCart={() => navigateTo('quote')}
      />

      <WhatsAppWidget cart={cart} />
      </div>
    </FirebaseProvider>
  );
}
