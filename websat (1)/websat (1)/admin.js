
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitleText = document.getElementById('pageTitleText');
    const productsTable = document.querySelector('#products tbody');
    const ordersTable = document.querySelector('#orders tbody');

    // --- Tab Switching Logic ---
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');

            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) content.classList.add('active');
            });

            pageTitleText.innerText = item.innerText.trim();
            if (window.innerWidth < 1024) sidebar.classList.remove('active');
        });
    });

    // --- Sidebar Toggle ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    }

    // --- Mock Data Injection for Realism ---
    initAdmin();

    function initAdmin() {
        renderAdminProducts();
        renderAdminOrders();
    }

    function renderAdminProducts() {
        if (!productsTable) return;
        // Mocking the data for the admin view
        const adminProducts = [
            { id: 1, name: "Klassik Ko'ylak", price: "150,000 UZS", stock: 45, status: "Sotuvda" },
            { id: 2, name: "Oq Futbolka", price: "80,000 UZS", stock: 120, status: "Sotuvda" },
            { id: 3, name: "Sport Krossovka", price: "350,000 UZS", stock: 12, status: "Kam qolgan" },
            { id: 4, name: "Kuzgi Kurtka", price: "420,000 UZS", stock: 0, status: "Tugagan" }
        ];

        productsTable.innerHTML = adminProducts.map(p => `
            <tr>
                <td>#${p.id}</td>
                <td style="font-weight: 600;">${p.name}</td>
                <td>${p.price}</td>
                <td>${p.stock} ta</td>
                <td><span class="status-badge ${getStatusClass(p.status)}">${p.status}</span></td>
                <td>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-icon" title="Tahrirlash"><i class="fa-solid fa-edit"></i></button>
                        <button class="btn-icon" title="O'chirish" style="color: var(--danger);"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function renderAdminOrders() {
        if (!ordersTable) return;
        const orders = [
            { id: 1024, user: "Aziz Rahimov", date: "2024-05-20", total: "450,000 UZS", status: "Yetkazildi" },
            { id: 1025, user: "Madina Alieva", date: "2024-05-21", total: "150,000 UZS", status: "Kutilmoqda" },
            { id: 1026, user: "Jasur Komilov", date: "2024-05-21", total: "820,000 UZS", status: "Jarayonda" }
        ];

        ordersTable.innerHTML = orders.map(o => `
            <tr>
                <td>#${o.id}</td>
                <td>${o.user}</td>
                <td>${o.date}</td>
                <td>${o.total}</td>
                <td><span class="status-badge ${getStatusClass(o.status)}">${o.status}</span></td>
                <td><button class="btn btn-outline" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Ko'rish</button></td>
            </tr>
        `).join('');
    }

    function getStatusClass(status) {
        if (["Sotuvda", "Yetkazildi"].includes(status)) return "success";
        if (["Kam qolgan", "Jarayonda", "Kutilmoqda"].includes(status)) return "warning";
        return "danger";
    }

    // Add styles for the admin status badges if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .status-badge { padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 0.8rem; font-weight: 600; }
        .status-badge.success { background: #ecfdf5; color: #10b981; }
        .status-badge.warning { background: #fffbeb; color: #f59e0b; }
        .status-badge.danger { background: #fef2f2; color: #ef4444; }
        .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.1rem; color: var(--text-light); transition: 0.3s; }
        .btn-icon:hover { color: var(--primary-color); transform: scale(1.1); }
    `;
    document.head.appendChild(style);
});
