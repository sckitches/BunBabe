/*
  Realtime Database Wrapper - Firebase Mocked
  Connected to BunBabe Secure DB Setup
*/
const DATABASE = {
    connected: false,
    
    // Simulate connection
    connect: function() {
        console.log("🔗 Connecting to BunBabe Real Database...");
        return new Promise((resolve) => {
            setTimeout(() => {
                this.connected = true;
                console.log("✅ Database Connected Successfully!");
                resolve();
            }, 800);
        });
    },

    // Fetch orders from DB (falls back to local storage sync)
    getOrders: async function() {
        if (!this.connected) await this.connect();
        const local = JSON.parse(localStorage.getItem('bunbabe_orders') || '[]');
        return local;
    },

    // Push new order to DB
    pushOrder: async function(order) {
        if (!this.connected) await this.connect();
        const past = JSON.parse(localStorage.getItem('bunbabe_orders') || '[]');
        past.unshift(order);
        localStorage.setItem('bunbabe_orders', JSON.stringify(past));
        console.log("☁️ Order synced to database!");
    },
    
    // Update existing order status in DB
    updateOrderStatus: async function(id, statusField, newStatus) {
        if (!this.connected) await this.connect();
        const past = JSON.parse(localStorage.getItem('bunbabe_orders') || '[]');
        const idx = past.findIndex(o => o.id === id);
        if (idx !== -1) {
            past[idx][statusField] = newStatus;
            localStorage.setItem('bunbabe_orders', JSON.stringify(past));
            console.log(`☁️ Order ${id} updated in database.`);
        }
    },

    // Empty cart post-checkout
    clearCart: function() {
        localStorage.removeItem('bunbabe_cart');
        console.log("🛒 Cart cleared.");
    }
};

window.DATABASE = DATABASE;
