<template>
    <div>
        <OrderFilter @search-updated="updateTagSearch"></OrderFilter>
        <div v-if="Object.keys(orders).length === 0">
            <p class="text-muted text-center bg-light my-2">There is no product in Order.</p>
        </div>
        <div v-else class="pb-5">
            <div v-for="(order, orderIndex) in orders" :key="orderIndex" class="my-2">
                <div class="d-flex border-bottom">
                    <img v-if="order.items && order.items.length" :src="order.items[0].stock.image" class="border-end"
                        style=" width: 80px; object-fit: fill;">
                    <div v-if="order.items" class="flex-fill d-flex flex-column justify-content-between">
                        <div class="p-2">
                            <div class="d-flex justify-content-between">
                                <p class="fw-bold mb-0 truncate">{{ order.product_name }}
                                </p>
                                <span class="badge rounded-pill text-bg-secondary"> {{ order.status }}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <small class="">{{ order.sid }}</small>
                                <small class="">{{ order.quantity }}</small>
                            </div>
                            <span>
                                {{ order.message }}
                            </span>
                        </div>
                        <div class="d-flex justify-content-between" role="group">
                            <button class="w-100 d-flex justify-content-center mx-1 btn btn-danger rounded-0"
                                v-if="order.status === 'accepted' || order.status === 'issued'"
                                @click="cancelOrder(order.sid)">
                                Cancel Order
                            </button>
                            <button v-if="order.status === 'rejected'" @click="reissuePurchaseOrder(order.sid, 'reorder')"
                                class="btn btn-warning rounded-0 mx-1 w-100">
                                Re-Issue
                            </button>
                            <button v-if="order.status === 'cancelled' || order.status === 'rejected'"
                                @click="reorderPurchaseOrder(order.sid)" class="btn btn-info rounded-0 mx-1 w-100">
                                Re-Order
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axiosinstance from '@/axiosPort'
import OrderFilter from '@/components/Filter/OrderFilter.vue';
export default {
    components: { OrderFilter },
    data() {
        return {
            status: '',
            // issued, accepted, rejected, cancelled
        };
    },
    watch: {
        status() {
            this.fetchData();
        },
    },
    mounted() {
        this.fetchData();
        this.$store.dispatch('fetchFilteredOrders', this.status);
    },
    computed: {
        orders() {
            return this.$store.getters.getFilteredOrders;
        }
    },
    methods: {
        updateTagSearch({ searchTerm, status }) {
            this.searchTerm = searchTerm;
            this.status = status;
            this.fetchData();
        },
        fetchData() {
            this.$store.dispatch('fetchFilteredOrders', this.status)
                .then(response => {
                    if (response && response.data) {
                        const result = response.data;
                        if (Array.isArray(result)) {
                            const filteredOrders = result.filter(order => {
                                const productName = order.product_name.toLowerCase();
                                const searchTerm = this.searchTerm.toLowerCase();
                                return productName.includes(searchTerm);
                            });
                            this.$store.commit('setFilteredOrders', filteredOrders);
                        } else {
                            console.error('Error: Result.data is not an array');
                        }
                    } else {
                        console.error('Error: Invalid response structure');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        cancelOrder(pSid) {
            const token = localStorage.getItem('token');
            axiosinstance.put('orders/' + pSid, {
                status: 'rejected'
                // status: 'cancelled'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => {
                    console.log('Order successfully cancelled:', response.data);
                })
                .catch(error => {
                    console.error('There was a problem with the Axios request:', error);
                });
        },
        reorderPurchaseOrder(orderId) {
            const token = localStorage.getItem('token');
            axiosinstance.put(`orders/${orderId}`, {
                message: 'Reissue',
                status: 'issued'
            }, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    if (response.status === 'pending') {
                        console.log('status changed', response.data);
                    }
                })
                .catch((error) => {
                    console.error('acceptPurchaseOrder:', error);
                });
        },
        reissuePurchaseOrder(order) {
            // Extract data from the order object
            const { expected_at, message, party_sid, product_sid, quantities } = order;
            // Create an object to store in local storage
            const orderData = {
                expected_at,
                message,
                party_sid,
                product_sid,
                quantities
            };
            // Log the data before storing
            console.log('Before storing in Vuex store:', orderData);
            // Dispatch action to store in Vuex store
            this.$store.dispatch('reorder', orderData);
            // Log the data after storing
            console.log('After storing in Vuex store:', this.$store.getters.getOrders);
            // Redirect the user to the off-canvas component
            this.$router.push({ name: 'your-off-canvas-route' }); // Replace 'your-off-canvas-route' with the actual route name
        },
        putCanceleOrder(pSid) {
            const cancelOrder = {
                product_sid: pSid
            };
            this.$store.dispatch('putCanceleOrder', cancelOrder);
        },
    },
}
</script>

<style lang="scss" scoped></style>