"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "212687014617";

const CATEGORIES = [
  { id: "clothing", label: "ملابس" },
  { id: "accessories", label: "إكسسوارات" },
];

const PRODUCTS = [
  { id: 17, name: "بولو رجالي محبوك أسود", cat: "clothing", price: 259, img: "/3.jpg", trust: true },
  { id: 18, name: "قميص مقلم أزرق وأبيض واسع", cat: "clothing", price: 189, img: "/8.jpg", trust: false },
  { id: 19, name: "قميص بني قطيفة واسع الأكمام", cat: "clothing", price: 219, img: "/2.jpg", trust: true },
  { id: 20, name: "بلوزة كتان بنية بأكمام قصيرة", cat: "clothing", price: 199, img: "/7.jpg", trust: false },
  { id: 21, name: "سروال جينز أزرق غامق واسع", cat: "clothing", price: 249, img: "/4.jpg", trust: true },
  { id: 22, name: "سروال جينز نسائي أزرق غامق", cat: "clothing", price: 259, img: "/5.jpg", trust: false },
  { id: 23, name: "توب بدون أكمام أسود مطرز", cat: "clothing", price: 149, img: "/6.jpg", trust: true },
  { id: 24, name: "توب بدون أكمام رمادي غامق واشد", cat: "clothing", price: 119, img: "/9.jpg", trust: false },
  { id: 25, name: "توب بدون أكمام أبيض قطن", cat: "clothing", price: 99, img: "/11.jpg", trust: true },
  { id: 26, name: "توب بدون أكمام وردي", cat: "clothing", price: 109, img: "/1.jpg", trust: false },
  { id: 33, name: "بولو أسود بياقة كريمية", cat: "clothing", price: 269, img: "/10.jpg", trust: true },
  { id: 27, name: "حزام جلدي كلاسيكي", cat: "accessories", price: 89, img: "https://picsum.photos/seed/maro-acc-belt/500/500", trust: true },
  { id: 28, name: "نظارة شمسية عصرية", cat: "accessories", price: 129, img: "https://picsum.photos/seed/maro-acc-sunglasses/500/500", trust: false },
  { id: 29, name: "ساعة يد أنيقة", cat: "accessories", price: 299, img: "https://picsum.photos/seed/maro-acc-watch/500/500", trust: true },
  { id: 30, name: "محفظة جلدية رجالية", cat: "accessories", price: 99, img: "https://picsum.photos/seed/maro-acc-wallet/500/500", trust: true },
  { id: 31, name: "شنطة يد نسائية", cat: "accessories", price: 249, img: "https://picsum.photos/seed/maro-acc-bag/500/500", trust: false },
  { id: 32, name: "سلسلة رقبة فضية", cat: "accessories", price: 69, img: "https://picsum.photos/seed/maro-acc-necklace/500/500", trust: false },
];

const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function TruckIcon() {
  return (
    <div className="truck">
      <div className="truck-bounce">
        <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="14" width="38" height="16" rx="2" fill="#FFD700" />
          <path d="M42 30 L42 20 Q42 18 44 18 L54 18 L70 26 L70 30 Z" fill="#F4F8FB" />
          <rect x="46" y="21" width="10" height="6" rx="1" fill="#0A5C9E" />
          <rect x="68" y="27" width="3" height="3" rx="1" fill="#FFD700" />
          <circle className="wheel" cx="16" cy="32" r="6" fill="#10202E" />
          <circle cx="16" cy="32" r="2.2" fill="#5B6B78" />
          <circle className="wheel" cx="58" cy="32" r="6" fill="#10202E" />
          <circle cx="58" cy="32" r="2.2" fill="#5B6B78" />
        </svg>
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={p.img} alt={p.name} loading="lazy" />
        {p.trust && <div className="badge-trust">🛡️ مُوثّق</div>}
        <div className="badge-cat">{CAT_LABEL[p.cat]}</div>
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <div className="price-row">
          <span className="price">
            {p.price} <small>د.م</small>
          </span>
        </div>
        <button className="buy-btn" onClick={() => onAdd(p.id)}>
          🛒 أضف للسلة
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState("home");
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState([]); // {id, qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function addToCart(id) {
    setCart((prev) => {
      const line = prev.find((l) => l.id === id);
      if (line) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
    setCartOpen(true);
  }
  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }
  function removeLine(id) {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }

  const cartLines = cart
    .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id) }))
    .filter((l) => l.product);
  const cartCount = cartLines.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cartLines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  const checkoutMsg = cartLines.length
    ? `مرحباً مارو، أرغب في تأكيد الطلب التالي:\n\n${cartLines
        .map((l) => `• ${l.product.name} × ${l.qty} — ${l.product.price * l.qty} د.م`)
        .join("\n")}\n\nالمجموع: ${cartTotal} د.م`
    : "مرحباً مارو، لدي استفسار عن منتجاتكم";

  const featured = PRODUCTS.filter((p) => p.trust).slice(0, 4);
  const filteredProducts = activeCat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);

  function goTo(v) {
    setView(v);
    setMenuOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <div className="brand-badge logo-en">M</div>
            <div className="brand-text">
              <b>مارو</b>
              <span className="logo-en">MARO</span>
            </div>
          </div>
          <nav className="links" style={menuOpen ? { display: "flex", flexDirection: "column", position: "absolute", top: 64, right: 0, left: 0, background: "#fff", padding: "16px 20px", gap: 16, boxShadow: "0 10px 20px rgba(0,0,0,.08)" } : {}}>
            <a onClick={() => goTo("home")} className={view === "home" ? "active" : ""}>الرئيسية</a>
            <a onClick={() => goTo("products")} className={view === "products" ? "active" : ""}>المنتجات</a>
            <a onClick={() => goTo("about")} className={view === "about" ? "active" : ""}>عن المتجر</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-cta" onClick={() => goTo("products")}>تسوّق الآن</a>
            <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="السلة">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="burger" onClick={() => setMenuOpen((o) => !o)}>☰</button>
          </div>
        </div>
      </header>

      {view === "home" && (
        <div>
          <div className="hero">
            <div className="hero-inner">
              <div>
                <div className="hero-eyebrow">👕 تشكيلة جديدة كل أسبوع</div>
                <h1>مارو — أزياء وإكسسوارات <em>تُحقق أناقتك</em></h1>
                <p>ملابس وإكسسوارات مختارة بعناية، بجودة موثوقة وأسعار منافسة. اطلبي أو اطلب من سيدي سليمان، وتوصلك القطعة بسرعة أو استلمها من المتجر.</p>
                <div className="hero-actions">
                  <a className="btn-gold" onClick={() => goTo("products")}>تصفّح المنتجات ←</a>
                  <a className="btn-ghost" href={waLink("مرحباً مارو، لدي استفسار عن منتجاتكم")} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
                </div>
                <div className="hero-stats">
                  <div><b className="num">+500</b><span>عميل موثوق</span></div>
                  <div><b className="num">24س</b><span>توصيل سريع</span></div>
                  <div><b className="num">100%</b><span>ضمان جودة</span></div>
                </div>
              </div>
              <div className="hero-visual">
                <div className="seal"><span>مُوثّق<br />100%</span></div>
                <div className="hero-card">
                  <img src="https://picsum.photos/seed/maro-hero/700/560" alt="منتجات مارو" />
                  <div className="tag">أفضل الأسعار <b>هذا الأسبوع</b></div>
                </div>
              </div>
            </div>
          </div>

          <div className="delivery-strip">
            <div className="delivery-inner">
              <div className="delivery-label">🏠 توصيل سريع داخل سيدي سليمان</div>
              <div className="road">
                <div className="road-line"></div>
                <TruckIcon />
              </div>
            </div>
          </div>

          <section className="offers">
            <div className="section-inner">
              <div className="offer-banner">
                <div>
                  <h3>🎁 عروض خاصة على أحدث تشكيلة الملابس</h3>
                  <p>خصومات تصل إلى 20٪ لفترة محدودة — العرض ساري داخل سيدي سليمان فقط</p>
                </div>
                <a className="btn-gold" onClick={() => goTo("products")}>اكتشف العروض</a>
              </div>
            </div>
          </section>

          <section>
            <div className="section-inner">
              <div className="section-head">
                <div>
                  <span className="eyebrow">الأكثر طلباً</span>
                  <h2>منتجات مختارة لك</h2>
                </div>
                <a onClick={() => goTo("products")} style={{ fontWeight: 800, color: "var(--primary)", cursor: "pointer" }}>عرض الكل ←</a>
              </div>
              <div className="grid">
                {featured.map((p) => (
                  <ProductCard key={p.id} p={p} onAdd={addToCart} />
                ))}
              </div>
            </div>
          </section>

          <section className="offers">
            <div className="section-inner">
              <div className="section-head" style={{ marginBottom: 26 }}>
                <div>
                  <span className="eyebrow">لماذا مارو</span>
                  <h2>خدمات تبني الثقة</h2>
                </div>
              </div>
              <div className="trust-strip">
                <div className="trust-item"><div className="trust-icon">🚚</div><b>توصيل سريع</b><span>توصيل داخل سيدي سليمان في نفس اليوم أو اليوم الموالي</span></div>
                <div className="trust-item"><div className="trust-icon">🏬</div><b>استلام من المتجر</b><span>يمكنك استلام طلبك مباشرة من المتجر دون انتظار</span></div>
                <div className="trust-item"><div className="trust-icon">🛡️</div><b>ضمان جودة</b><span>كل قطعة تخضع لفحص جودة وتأتي بضمان واضح</span></div>
                <div className="trust-item"><div className="trust-icon">💬</div><b>دعم فوري</b><span>تواصل معنا عبر واتساب أو تيليجرام لأي استفسار</span></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {view === "products" && (
        <div>
          <section style={{ paddingTop: 40 }}>
            <div className="section-inner">
              <div className="section-head">
                <div>
                  <span className="eyebrow">الكتالوج الكامل</span>
                  <h2>كل منتجات مارو</h2>
                  <p>تصفّح حسب الفئة، واطلب مباشرة عبر واتساب بضغطة واحدة</p>
                </div>
              </div>
              <div className="filters">
                <button className={`filter-btn ${activeCat === "all" ? "active" : ""}`} onClick={() => setActiveCat("all")}>الكل</button>
                {CATEGORIES.map((c) => (
                  <button key={c.id} className={`filter-btn ${activeCat === c.id ? "active" : ""}`} onClick={() => setActiveCat(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="grid">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} p={p} onAdd={addToCart} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {view === "about" && (
        <div>
          <section style={{ paddingTop: 50 }}>
            <div className="section-inner about-wrap">
              <div className="about-text">
                <span className="eyebrow">عن المتجر</span>
                <h2>مارو — <em>أزياء تُحقق أناقتك</em></h2>
                <p>انطلق متجر مارو من سيدي سليمان ليكون الوجهة اليومية للسكان المحليين في الحصول على ملابس وإكسسوارات مختارة بعناية، بأسعار منافسة، دون التنازل عن الجودة أو السرعة.</p>
                <p>نؤمن أن الثقة تُبنى بالتفاصيل الصغيرة: منتج موثّق، سعر واضح، وخدمة توصيل لا تتأخر.</p>
                <div className="about-list">
                  <div><span className="dot">✓</span> ملابس وإكسسوارات بأسعار منافسة</div>
                  <div><span className="dot">✓</span> توصيل سريع أو استلام من المتجر</div>
                  <div><span className="dot">✓</span> ضمان جودة على كل قطعة</div>
                  <div><span className="dot">✓</span> دعم فني عبر واتساب وتيليجرام</div>
                </div>
              </div>
              <img src="https://picsum.photos/seed/maro-about/700/700" alt="متجر مارو" />
            </div>
          </section>

          <section className="offers">
            <div className="section-inner">
              <div className="offer-banner">
                <div>
                  <h3>📍 سيدي سليمان — المغرب</h3>
                  <p>زورونا في المتجر أو اطلبوا أونلاين، ونوصلكم أينما كنتم داخل المدينة</p>
                </div>
                <a className="btn-gold" href={waLink("مرحباً مارو، لدي استفسار عن منتجاتكم")} target="_blank" rel="noopener noreferrer">راسلنا الآن</a>
              </div>
            </div>
          </section>
        </div>
      )}

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <b>مارو — MARO</b>
            <p>تسوّق ببساطة. ملابس وإكسسوارات مختارة بعناية، بثقة وسرعة، في سيدي سليمان.</p>
          </div>
          <div className="footer-col">
            <b>روابط</b>
            <a onClick={() => goTo("home")}>الرئيسية</a>
            <a onClick={() => goTo("products")}>المنتجات</a>
            <a onClick={() => goTo("about")}>عن المتجر</a>
          </div>
          <div className="footer-col">
            <b>تواصل معنا</b>
            <span>📍 سيدي سليمان، 14000</span>
            <span>📱 واتساب: 0687-014617</span>
            <span>✈️ تيليجرام: t.me/maro_store</span>
          </div>
        </div>
        <div className="footer-bottom">© 2026 مارو MARO — جميع الحقوق محفوظة</div>
      </footer>

      <a className="wa-float" href={waLink("مرحباً مارو، لدي استفسار عن منتجاتكم")} target="_blank" rel="noopener noreferrer">💬</a>

      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)}></div>
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-head">
          <h3>🛒 سلة الطلب</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-body">
          {cartLines.length === 0 ? (
            <div className="cart-empty">
              <div className="ic">🛒</div>
              سلتك فارغة حالياً
              <br />
              أضف منتجات لتبدأ طلبك
            </div>
          ) : (
            cartLines.map((l) => (
              <div className="cart-item" key={l.id}>
                <img src={l.product.img} alt={l.product.name} />
                <div className="cart-item-info">
                  <h4>{l.product.name}</h4>
                  <div className="cart-item-price">{l.product.price} د.م</div>
                  <div className="qty-ctrl">
                    <button onClick={() => changeQty(l.id, -1)}>−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => changeQty(l.id, 1)}>+</button>
                    <button className="cart-remove" onClick={() => removeLine(l.id)}>إزالة</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total-row">
            <span>المجموع</span>
            <b>{cartTotal} د.م</b>
          </div>
          <a className="checkout-btn" href={waLink(checkoutMsg)} target="_blank" rel="noopener noreferrer">
            💬 إتمام الطلب عبر واتساب
          </a>
          <p className="checkout-note">سيتم فتح واتساب مع تفاصيل طلبك جاهزة للإرسال</p>
        </div>
      </aside>
    </>
  );
}
