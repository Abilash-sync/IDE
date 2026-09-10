// Dashboard List Manager
class DashboardManager {
    constructor() {
        this.items = this.loadItems();
        this.filteredItems = this.items;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add item button
        document.getElementById('addBtn').addEventListener('click', () => this.addItem());

        // Enter key in input fields
        document.getElementById('itemInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });
        document.getElementById('descriptionInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });

        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filter(e.target.dataset.filter);
            });
        });
    }

    addItem() {
        const titleInput = document.getElementById('itemInput');
        const descriptionInput = document.getElementById('descriptionInput');
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!title) {
            alert('Please enter a title');
            return;
        }

        const item = {
            id: Date.now(),
            title,
            description,
            completed: false,
            favorite: false,
            date: new Date().toLocaleDateString()
        };

        this.items.unshift(item);
        this.saveItems();
        this.render();

        // Clear inputs
        titleInput.value = '';
        descriptionInput.value = '';
        titleInput.focus();
    }

    deleteItem(id) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveItems();
            this.render();
        }
    }

    toggleComplete(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.completed = !item.completed;
            this.saveItems();
            this.render();
        }
    }

    toggleFavorite(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.favorite = !item.favorite;
            this.saveItems();
            this.render();
        }
    }

    search(query) {
        const lowercaseQuery = query.toLowerCase();
        this.filteredItems = this.items.filter(item => {
            const matchesFilter = this.currentFilter === 'all' ||
                (this.currentFilter === 'completed' && item.completed) ||
                (this.currentFilter === 'active' && !item.completed);

            const matchesSearch = item.title.toLowerCase().includes(lowercaseQuery) ||
                item.description.toLowerCase().includes(lowercaseQuery);

            return matchesFilter && matchesSearch;
        });
        this.render();
    }

    filter(filterType) {
        this.currentFilter = filterType;
        const searchQuery = document.getElementById('searchInput').value;
        this.search(searchQuery);
    }

    updateStats() {
        const total = this.items.length;
        const completed = this.items.filter(item => item.completed).length;
        const active = total - completed;

        document.getElementById('totalItems').textContent = total;
        document.getElementById('completedItems').textContent = completed;
        document.getElementById('activeItems').textContent = active;
        document.getElementById('itemCount').textContent = `(${this.filteredItems.length})`;
    }

    render() {
        const listContainer = document.getElementById('dashboardList');

        if (this.filteredItems.length === 0) {
            listContainer.innerHTML = '<div class="empty-state"><p>✨ No items to display</p></div>';
        } else {
            listContainer.innerHTML = this.filteredItems.map(item => `
                <div class="dashboard-item ${item.completed ? 'completed' : ''}">
                    <div class="checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            ${item.completed ? 'checked' : ''} 
                            onchange="dashboard.toggleComplete(${item.id})"
                        >
                    </div>
                    <div class="item-content">
                        <div class="item-title">${this.escapeHtml(item.title)}</div>
                        ${item.description ? `<div class="item-description">${this.escapeHtml(item.description)}</div>` : ''}
                    </div>
                    <div class="item-meta">
                        <span class="item-date">${item.date}</span>
                        <div class="item-actions">
                            <button 
                                class="btn-action btn-favorite ${item.favorite ? 'active' : ''}"
                                onclick="dashboard.toggleFavorite(${item.id})"
                                title="Add to favorites"
                            >
                                ★
                            </button>
                            <button 
                                class="btn-action btn-delete"
                                onclick="dashboard.deleteItem(${item.id})"
                                title="Delete item"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateStats();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveItems() {
        localStorage.setItem('dashboardItems', JSON.stringify(this.items));
    }

    loadItems() {
        const saved = localStorage.getItem('dashboardItems');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new DashboardManager();
});
