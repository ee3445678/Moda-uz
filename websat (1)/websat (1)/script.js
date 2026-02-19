
const products = [
    {
        id: 1,
        name: "Klassik Ko'ylak",
        category: "Erkaklar",
        price: 150000,
        image: "https://images.unsplash.com/photo-1593030761757-71bd90dbe3e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Yuqori sifatli klassik erkaklar ko'ylagi. Har qanday tadbir uchun mos."
    },
    {
        id: 2,
        name: "Oq Futbolka",
        category: "Yozgi",
        price: 80000,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "100% paxtadan tayyorlangan qulay yozgi futbolka."
    },
    {
        id: 3,
        name: "Sport Krossovka",
        category: "Poyabzal",
        price: 350000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Yugurish va har kuni kiyish uchun yengil krossovkalar."
    },
    {
        id: 4,
        name: "Kuzgi Kurtka",
        category: "Ustki kiyim",
        price: 420000,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Suv o'tkazmaydigan va issiq saqlovchi kuzgi kurtka."
    },
    {
        id: 5,
        name: "Gulli Ko'ylak",
        category: "Ayollar",
        price: 200000,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Yozgi mavsum uchun zamonaviy gulli ayollar ko'ylagi."
    },
    {
        id: 6,
        name: "Qora Kepka",
        category: "Aksessuarlar",
        price: 50000,
        image: "https://images.unsplash.com/photo-1551028919-ac66e62469d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Zamonaviy qora dizayndagi kepka."
    },
    {
        id: 7,
        name: "Moviy Jinsi",
        category: "Erkaklar",
        price: 220000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Sifatli denimdan tikilgan moviy rangli jinsi shim."
    },
    {
        id: 8,
        name: "Qishki Sharf",
        category: "Aksessuarlar",
        price: 65000,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Yumshoq junli issiq qishki sharf."
    },
    {
        id: 9,
        name: "Zamonaviy Xudi",
        category: "Erkaklar",
        price: 280000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        description: "Trenddagi dizaynga ega erkaklar xudisi."
    },
    {
        id: 10,
        name: "Charm Kurtka",
        category: "Ustki kiyim",
        price: 650000,
        image: "https://images.unsplash.com/photo-1551028712-b5b5bab28a67?auto=format&fit=crop&w=600&q=80",
        description: "Haqiqiy charmdan ishlangan premium kurtka."
    },
    {
        id: 11,
        name: "Elegant Ko'ylak",
        category: "Ayollar",
        price: 450000,
        image: "https://images.unsplash.com/photo-1539008835257-56a1e0828209?auto=format&fit=crop&w=600&q=80",
        description: "Kechki tadbirlar uchun o'ta nafis va elegant ko'ylak."
    },
    {
        id: 12,
        name: "Charm Sumka",
        category: "Aksessuarlar",
        price: 320000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        description: "Sifatli charmdan tayyorlangan qo'l sumkasi."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    let cart = JSON.parse(localStorage.getItem('modauz_cart')) || [];

    // --- Selectors ---
    const preloader = document.getElementById('preloader');
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const productsGrid = document.querySelector('.products-grid');
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- Initialization ---
    init();

    function init() {
        // Preloader
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.style.display = 'none', 600);
                }, 500);
            });
        }

        renderProducts(products);
        updateCartUI();
        setupEventListeners();
        revealOnScroll();
        injectModals();
        setupTheme();
    }

    function setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle?.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        // Apply saved theme
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        // Toggle event
        themeToggle?.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            if (icon) {
                if (isDark) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            }
        });
    }

    function setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');

            // Back to Top button
            if (window.scrollY > 500) backToTop?.classList.add('show');
            else backToTop?.classList.remove('show');

            revealOnScroll();
        });

        // Back to Top click
        backToTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Nav Toggle
        navToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Cart Drawer
        cartBtn?.addEventListener('click', () => toggleCart(true));
        closeCart?.addEventListener('click', () => toggleCart(false));
        cartOverlay?.addEventListener('click', () => toggleCart(false));

        // Search
        searchInput?.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
            );
            renderProducts(filtered);
        });

        // Filters
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.innerText;
                const filtered = cat === 'Barchasi' ? products : products.filter(p => p.category.includes(cat) || p.name.includes(cat));
                renderProducts(filtered);
            });
        });

        // Global Event Delegation for Dynamic Elements
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            const detailsBtn = e.target.closest('.details-btn');
            const qtyBtn = e.target.closest('.qty-btn');
            const removeItem = e.target.closest('.remove-item');
            const checkoutBtn = e.target.closest('.checkout-btn');
            const closeModal = e.target.closest('.close-modal');

            if (addToCartBtn) {
                const id = parseInt(addToCartBtn.dataset.id);
                addToCart(id);
            }

            if (detailsBtn) {
                const id = parseInt(detailsBtn.dataset.id);
                showProductDetails(id);
            }

            if (qtyBtn) {
                const id = parseInt(qtyBtn.dataset.id);
                const action = qtyBtn.dataset.action;
                updateQty(id, action);
            }

            if (removeItem) {
                const id = parseInt(removeItem.dataset.id);
                removeFromCart(id);
            }

            if (checkoutBtn) {
                if (cart.length === 0) {
                    showNotification("Savat bo'sh!", "error");
                    return;
                }
                showCheckout();
            }

            if (closeModal || e.target.classList.contains('modal-overlay')) {
                closeModals();
            }
        });
    }

    // --- Core Functions ---

    function renderProducts(items) {
        if (!productsGrid) return;

        if (items.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--border); margin-bottom: 1rem;"></i>
                    <h3>Mahsulot topilmadi</h3>
                    <p>Boshqa so'z bilan qidirib ko'ring</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = items.map(p => `
            <div class="product-card reveal">
                <div class="product-image-container">
                    <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
                    <div class="product-badge">${p.category}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-description">${p.description.substring(0, 60)}...</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(p.price)}</span>
                        <div class="btn-group" style="display: flex; gap: 0.5rem;">
                            <button class="add-btn add-to-cart-btn" data-id="${p.id}" title="Savatga qo'shish">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                            <button class="add-btn details-btn" data-id="${p.id}" style="background: var(--text-dark); color: white;">
                                Batafsil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Trigger reveal for new elements
        setTimeout(revealOnScroll, 100);
    }

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        saveCart();
        updateCartUI();
        showNotification(`${product.name} savatga qo'shildi!`);
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartUI();
    }

    function updateQty(id, action) {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        if (action === 'plus') {
            item.qty++;
        } else {
            item.qty--;
            if (item.qty <= 0) {
                removeFromCart(id);
                return;
            }
        }

        saveCart();
        updateCartUI();
    }

    function updateCartUI() {
        // Update Count
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCount) cartCount.innerText = count;

        // Update Items List
        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart-message">
                        <i class="fa-solid fa-shopping-basket"></i>
                        <p>Savatingiz hozircha bo'sh</p>
                        <a href="shop.html" class="btn" style="margin-top: 1rem; padding: 0.8rem 1.5rem;">Xaridni boshlash</a>
                    </div>
                `;
            } else {
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <p>${formatPrice(item.price)}</p>
                            <div class="item-qty">
                                <button class="qty-btn" data-id="${item.id}" data-action="minus"><i class="fa-solid fa-minus"></i></button>
                                <span>${item.qty}</span>
                                <button class="qty-btn" data-id="${item.id}" data-action="plus"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <i class="fa-solid fa-trash remove-item" data-id="${item.id}"></i>
                    </div>
                `).join('');
            }
        }

        // Update Total
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (cartTotal) cartTotal.innerText = formatPrice(total);
    }

    function saveCart() {
        localStorage.setItem('modauz_cart', JSON.stringify(cart));
    }

    function toggleCart(show) {
        if (show) {
            cartDrawer?.classList.add('active');
            cartOverlay?.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            cartDrawer?.classList.remove('active');
            cartOverlay?.classList.remove('active');
            document.body.style.overflow = 'initial';
        }
    }

    // --- Utils ---

    function formatPrice(price) {
        return price.toLocaleString('uz-UZ') + ' UZS';
    }

    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.9) {
                el.classList.add('active');
            }
        });
    }

    function showNotification(text, type = "success") {
        const note = document.createElement('div');
        note.className = `notification ${type}`;
        note.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${text}`;
        document.body.appendChild(note);

        if (!document.getElementById('notifStyles')) {
            const style = document.createElement('style');
            style.id = 'notifStyles';
            style.innerHTML = `
                .notification {
                    position: fixed;
                    bottom: 30px;
                    left: 30px;
                    background: var(--text-dark);
                    color: var(--background);
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 3000;
                    animation: slideIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .notification.error { background: #d90429; color: white; }
                @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.7);
                    backdrop-filter: blur(8px);
                    z-index: 2500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0; visibility: hidden;
                    transition: all 0.4s ease;
                }
                .modal-overlay.show { opacity: 1; visibility: visible; }
                .modal-content {
                    background: var(--white);
                    color: var(--text-dark);
                    width: 90%; max-width: 600px;
                    padding: 2.5rem;
                    border-radius: 24px;
                    position: relative;
                    transform: translateY(30px);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .modal-overlay.show .modal-content { transform: translateY(0); }
                .close-modal { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; font-size: 1.5rem; z-index: 10; }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            note.style.opacity = '0';
            note.style.transform = 'translateY(20px)';
            note.style.transition = 'all 0.5s ease';
            setTimeout(() => note.remove(), 500);
        }, 3000);
    }

    function injectModals() {
        if (document.getElementById('globalModal')) return;
        const modalHTML = `
            <div class="modal-overlay" id="globalModal">
                <div class="modal-content" id="modalBody">
                    <i class="fa-solid fa-xmark close-modal"></i>
                    <div id="modalContent"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function showProductDetails(id) {
        const p = products.find(item => item.id === id);
        if (!p) return;

        const content = `
            <div class="details-top" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <img src="${p.image}" style="width: 100%; border-radius: 15px; height: 350px; object-fit: cover;">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 0.5rem; font-weight: 800; letter-spacing: -1px;">${p.name}</h2>
                    <span class="badge" style="background: var(--accent-color); color: var(--primary-color); padding: 0.4rem 1rem; border-radius: 100px; font-weight: 700; display: inline-block;">${p.category}</span>
                    <p style="margin-top: 1.5rem; color: var(--text-light); line-height: 1.6;">${p.description}</p>
                    <h3 style="font-size: 1.8rem; margin: 1.5rem 0; color: var(--primary-color); font-weight: 800;">${formatPrice(p.price)}</h3>
                    <button class="btn add-to-cart-btn" data-id="${p.id}" style="width: 100%;">
                        <i class="fa-solid fa-cart-plus"></i> Savatga qo'shish
                    </button>
                </div>
            </div>
        `;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('globalModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function showCheckout() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const content = `
            <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px;">Buyurtmani Rasmiylashtirish</h2>
            <form id="checkoutForm" style="display: flex; flex-direction: column; gap: 1.2rem;">
                <div class="form-group">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">To'liq ismingiz</label>
                    <input type="text" placeholder="Aziz Rahimov" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; font-family: inherit;">
                </div>
                <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Telefon</label>
                        <input type="tel" placeholder="+998 90 123 45 67" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; font-family: inherit;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Shahar</label>
                        <input type="text" placeholder="Toshkent" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; font-family: inherit;">
                    </div>
                </div>
                <div class="form-group">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Manzil</label>
                    <input type="text" placeholder="Chilonzor tumani, 5-daha" required style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; font-family: inherit;">
                </div>
                <div style="background: var(--accent-color); padding: 1.5rem; border-radius: 15px; margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.3rem; color: var(--text-dark);">
                        <span>Umumiy miqdor:</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                </div>
                <button type="submit" class="btn" style="padding: 1.2rem; font-size: 1.1rem; font-weight: 700;">Buyurtmani Tasdiqlash</button>
            </form>
        `;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('globalModal').classList.add('show');
        document.body.style.overflow = 'hidden';

        document.getElementById('checkoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            completeOrder();
        });
    }

    function completeOrder() {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="width: 100px; height: 100px; background: var(--success); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin: 0 auto 2rem; font-size: 3.5rem; box-shadow: 0 15px 35px rgba(16, 185, 129, 0.3);">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -1px;">Muvaffaqiyatli!</h2>
                <p style="font-size: 1.2rem; color: var(--text-light); line-height: 1.6;">Xaridingiz uchun rahmat! <br>Buyurtma ID: #MODA-${Math.floor(Math.random() * 10000)}</p>
                <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn close-modal" style="position: relative; top: 0; right: 0;">Yopish</button>
                    <button class="btn btn-outline" onclick="window.print()">Kvitansiya</button>
                </div>
            </div>
        `;
        cart = [];
        saveCart();
        updateCartUI();
        toggleCart(false);
    }

    function closeModals() {
        document.getElementById('globalModal').classList.remove('show');
        document.body.style.overflow = 'initial';
    }
});
