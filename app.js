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
        this.setItems(JSON.parse(localStorage.getItem('items')), false);
    },

    methods: {
        add(event) {
            event.preventDefault();

            let items = JSON.parse(localStorage.getItem('items'));
            console.log(items);

            if (typeof items !== 'object') {
                items = [];
            }
            console.log(items);

            items.push({
                name: this.currentName,
                quantity: this.currentQuantity,
                price: this.currentPrice,
            });
            console.log(items);

            this.setItems(items, true)

            this.currentName = null;
            this.currentQuantity = 1;
            this.currentPrice = null;
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
