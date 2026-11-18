
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Scissors,
  Shirt,
  Ruler,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import './App.css';

const WHATSAPP_NUMBER = '2349074447175';
const CART_STORAGE_KEY = 'honey-k-cart';

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price);

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Shop', href: '#shop' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  sizes: string[];
};

type CartItem = {
  productId: number;
  quantity: number;
  size: string;
};

const collections = [
  {
    name: 'Women’s Wear',
    description: 'Elegant looks made to celebrate you.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Men’s Wear',
    description: 'Refined tailoring with a modern edge.',
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Bespoke Designs',
    description: 'Personal style, thoughtfully tailored.',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
  },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Elegant Ankara Dress',
    category: 'Women’s Wear',
    price: 28000,
    image:
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Classic Men’s Suit',
    category: 'Men’s Wear',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85',
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'Chic Two-Piece Outfit',
    category: 'Women’s Wear',
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Premium Casual Jacket',
    category: 'Bespoke Designs',
    price: 38000,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85',
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
];

const services = [
  {
    icon: Scissors,
    title: 'Fashion Design & Tailoring',
    description:
      'Beautifully crafted outfits designed around your style, personality and measurements.',
  },
  {
    icon: Shirt,
    title: 'Ready-to-Wear',
    description:
      'Discover thoughtfully selected pieces that bring effortless elegance to your wardrobe.',
  },
  {
    icon: Ruler,
    title: 'Clothing Alterations',
    description:
      'Professional adjustments and finishing to help your clothes fit just right.',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Outfits',
    description:
      'Unique outfits created for your special moments, occasions and everyday expression.',
  },
];


function Header({
  cartCount,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <p>Thoughtfully tailored. Beautifully you.</p>
      </div>

      <div className="nav-container container">
        <a href="#home" className="brand-logo" aria-label="Honey-K Stitches home">
          <span className="brand-mark">H</span>
          <span className="brand-name">
            HONEY-K
            <small>STITCHES</small>
          </span>
        </a>

        <nav className={`main-navigation ${menuOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            className="nav-cta"
            href={whatsappLink(
              'Hello Honey-K Stitches! I would like to make an enquiry.',
            )}
            target="_blank"
            rel="noreferrer"
          >
            Make an Enquiry <ArrowRight size={15} />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="cart-nav-button"
            type="button"
            onClick={onCartOpen}
            aria-label={`Open shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" />

      <div className="hero-content container">
        <span className="eyebrow">THE ART OF PERSONAL STYLE</span>

        <h1>
          Elegance in
          <br />
          Every <em>Stitch.</em>
        </h1>

        <p>
          Discover beautifully tailored fashion, bespoke creations and
          timeless pieces designed to make every moment yours.
        </p>

        <div className="hero-actions">
          <a href="#collections" className="primary-button">
            Explore Collections <ArrowRight size={17} />
          </a>

          <a href="#services" className="hero-text-link">
            Discover Our Services
          </a>
        </div>

        <div className="hero-note">
          <span />
          Fashion for women and men
        </div>
      </div>

      <div className="hero-side-text">
        HONEY-K STITCHES · EST. IN STYLE
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container about-grid">
        <div className="about-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
            alt="Fashion styling and clothing inspiration"
            loading="lazy"
          />

          <div className="about-image-caption">
            <span>Made with care</span>
            <strong>Worn with confidence.</strong>
          </div>
        </div>

        <div className="about-content">
          <span className="eyebrow">THE HONEY-K EXPERIENCE</span>

          <h2>
            Style is personal.
            <br />
            <em>Your outfit should be too.</em>
          </h2>

          <p>
            At Honey-K Stitches, we believe great fashion goes beyond what
            you wear. It is about confidence, individuality and the feeling
            of wearing something made just right for you.
          </p>

          <p>
            From bespoke designs and professional tailoring to ready-to-wear
            pieces and alterations, we bring thoughtful craftsmanship to
            every stitch.
          </p>

          <a href="#contact" className="text-link">
            Get to know us <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section className="collections-section section-padding" id="collections">
      <div className="container">
        <div className="section-heading">
          <span>EXPLORE OUR STYLE</span>
          <h2>Made for your moments.</h2>
          <p>
            Explore fashion that brings together thoughtful design,
            craftsmanship and personal expression.
          </p>
        </div>

        <div className="collection-grid">
          {collections.map((collection, index) => (
            <article className="collection-card" key={collection.name}>
              <div className="collection-image">
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                />
                <span className="collection-number">0{index + 1}</span>
              </div>

              <div className="collection-info">
                <div>
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                </div>

                <a
                  href="#shop"
                  aria-label={`Explore ${collection.name}`}
                >
                  <ArrowRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: {
  product: Product;
  onAddToCart: (productId: number, size: string) => void;
  onViewDetails: (product: Product) => void;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <article className="product-card">
      <button
        className="product-image product-image-button"
        type="button"
        onClick={() => onViewDetails(product)}
        aria-label={`View larger image of ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-category">{product.category}</span>
     
      </button>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>

        <label className="product-size-label">
          Select size
          <select
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <button
          className="add-to-cart-button"
          type="button"
          onClick={() => onAddToCart(product.id, selectedSize)}
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ProductDetailsModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-image-viewer"
        role="dialog"
        aria-modal="true"
        aria-label={`Enlarged image of ${product.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="product-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close image"
        >
          <X size={22} />
        </button>

        <img src={product.image} alt={product.name} />
      </div>
    </div>
  );
}

function Shop({
  onAddToCart,
}: {
  onAddToCart: (productId: number, size: string) => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Women’s Wear',
    'Men’s Wear',
    'Bespoke Designs',
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="shop-section section-padding" id="shop">
      <div className="container">
        <div className="section-heading">
          <span>THE HONEY-K STORE</span>
          <h2>Find your next favourite.</h2>
          <p>
            Explore thoughtfully selected styles made to bring elegance
            and confidence to your wardrobe.
          </p>
        </div>

        <div className="shop-controls">
          <div className="shop-search">
            <input
              type="search"
              placeholder="Search outfits..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="category-filters" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category ? 'active' : ''
                }
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="product-results">
          <p>
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
          {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
    onViewDetails={setSelectedProduct}
  />
))}
          </div>
        ) : (
          <div className="no-products">
            <ShoppingBag size={35} strokeWidth={1.3} />
            <h3>No products found</h3>
            <p>
              Try another search or select a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
             
            >
              Clear Filters
            </button>
          </div>
        )}
        {selectedProduct && (
  <ProductDetailsModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}
      </div>
    </section>
  );
}


function CartDrawer({
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (
    productId: number,
    size: string,
    quantity: number,
  ) => void;
  onRemove: (productId: number, size: string) => void;
}) {
  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity, selectedSize: item.size } : null;
    })
    .filter((item) => item !== null);

  const total = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const orderMessage = [
    'Hello Honey-K Stitches! I would like to place an order:',
    '',
    ...cartProducts.map(
      (item) =>
        `${item.name} | Size: ${item.selectedSize} | Quantity: ${item.quantity} | ${formatPrice(item.price * item.quantity)}`,
    ),
    '',
    `Subtotal: ${formatPrice(total)}`,
    '',
    'Please confirm availability and delivery details.',
  ].join('\n');

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span>YOUR SELECTION</span>
            <h2>Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          </div>

          <button
            className="cart-close"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={23} />
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={45} strokeWidth={1.2} />
            <h3>Your cart is empty</h3>
            <p>Discover something beautiful for your wardrobe.</p>
            <button
              className="add-to-cart-button"
              type="button"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartProducts.map((item) => (
                <article
                  className="cart-item"
                  key={`${item.id}-${item.selectedSize}`}
                >
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                    <small>Size: {item.selectedSize}</small>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.selectedSize,
                            item.quantity - 1,
                          )
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            item.selectedSize,
                            item.quantity + 1,
                          )
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id, item.selectedSize)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <p>
                Delivery charges, if applicable, will be confirmed on WhatsApp.
              </p>

              <a
                className="checkout-button"
                href={whatsappLink(orderMessage)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} />
                Checkout on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <div className="section-heading">
          <span>WHAT WE DO</span>
          <h2>Crafted around you.</h2>
          <p>
            Whether you have a design in mind or need the perfect finishing
            touch, we are here to help.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.title}>
                <span className="service-number">0{index + 1}</span>
                <div className="service-icon">
                  <Icon size={25} strokeWidth={1.5} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactBanner() {
  return (
    <section className="contact-banner" id="contact">
      <div className="container contact-banner-content">
        <span className="eyebrow">LET'S CREATE SOMETHING BEAUTIFUL</span>
        <h2>
          Your style.
          <br />
          Our craftsmanship.
        </h2>
        <p>
          Have a design in mind, need an alteration or want to explore our
          collections? We would love to hear from you.
        </p>

        <a
          href={whatsappLink(
            'Hello Honey-K Stitches! I would like to discuss an outfit.',
          )}
          target="_blank"
          rel="noreferrer"
          className="light-button"
        >
          <MessageCircle size={18} /> Chat with us on WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <a href="#home" className="brand-logo footer-logo">
          <span className="brand-mark">H</span>
          <span className="brand-name">
            HONEY-K
            <small>STITCHES</small>
          </span>
        </a>

        <p>Elegance in Every Stitch.</p>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Honey-K Stitches. All rights reserved.
          </span>
          <a
            href={whatsappLink('Hello Honey-K Stitches!')}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink(
        'Hello Honey-K Stitches! I would like to make an enquiry.',
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Honey-K Stitches on WhatsApp"
    >
      <MessageCircle size={25} />
    </a>
  );
}

function getSavedCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) return [];

    const parsed: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.productId === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        typeof item.size === 'string',
    );
  } catch {
    return [];
  }
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getSavedCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: number, size: string) => {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { productId, quantity: 1, size }];
    });

    
  };

  const updateQuantity = (
    productId: number,
    size: string,
    quantity: number,
  ) => {
    if (quantity < 1) {
      setCartItems((current) =>
        current.filter(
          (item) => !(item.productId === productId && item.size === size),
        ),
      );
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main>
        <Hero />
        <About />
        <Collections />
        <Shop onAddToCart={addToCart} />
        <Services />
        <ContactBanner />
      </main>

      <Footer />
      <WhatsAppButton />

      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}
    </>
  );
}

export default App;
