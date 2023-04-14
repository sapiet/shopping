const { createApp } = Vue

createApp({
    data() {
        return {
            items: [],
            total: 0,
            currentName: null,
            currentQuantity: 1,
            currentPrice: null
        }
    },

    mounted() {
        this.setItems(this.getItems(), false);
    },

    methods: {
        add(event) {
            event.preventDefault();

            try {
                const items = this.getItems();

                items.push({
                    name: this.currentName,
                    quantity: this.currentQuantity,
                    price: this.currentPrice,
                });

                this.setItems(items, true)

                this.currentName = null;
                this.currentQuantity = 1;
                this.currentPrice = null;
            } catch (error) {
                alert(error);
            }
        },

        getItems() {
            let items = JSON.parse(localStorage.getItem('items'));

            if (typeof items !== 'object' || null === items) {
                items = [];
            }

            return items;
        },

        setItems(items, addInLocalStorage) {
            let total = 0;
            items.map(item => {
                item.total = item.quantity * item.price;
                total += item.total;
            })
            this.items = items;
            this.total = total;

            if (addInLocalStorage) {
                localStorage.setItem('items', JSON.stringify(items))
            }
        },

        remove(index) {
            this.items.splice(index, 1);
            this.setItems(this.items, true);
        },

        clear() {
            this.setItems([])
        }
    }
}).mount('#app')
