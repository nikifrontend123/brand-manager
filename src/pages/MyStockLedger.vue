<template>
    <LedgerFilters :stock="ledger.stock" :readyable="ledger.total_ready" :dispatchable="ledger.total_dispatch"
        @filters-changed="handleFiltersChange" />

    <div class="pb-5">

        <div v-if="!addOrder && !addDemand" class="border">
            <table class="table table-striped table-borderless mb-0" style="font-weight: 500;">
                <thead>
                    <tr class="table-dark">
                        <th class="ps-3 fw-bold text-start">Date</th>
                        <th class="fw-bold text-start">Order</th>
                        <th class="fw-bold text-center">Ready</th>
                        <th class="pe-3 fw-bold text-end">Demand</th>
                    </tr>
                </thead>
                <tbody v-if="ledger.items">
                    <tr v-for="(ledgerItem, ledgerItemIndex) in ledger.items.data" :key="ledgerItemIndex"
                        v-show="filters[ledgerItem.model]" data-bs-toggle="offcanvas" data-bs-target="#ledgerInfoModal"
                        :data-bs-ledgermodelsid="ledgerItem.model_sid" aria-controls="ledgerInfoModal">
                        <td class="ps-3 text-start">{{ formatDate(ledgerItem.created_at) }}</td>
                        <td colspan="3" class="pe-3" :class="[
                            getTableDataClass(ledgerItem),
                            getActiveClass(ledgerItem),
                            { 'text-danger': ledgerItem.model === 'adjustment' }
                        ]">
                            {{ ledgerItem.quantity.toLocaleString() }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="table-dark">
                        <td class="ps-3 text-start fw-bold" style="min-width: 90px;">Total</td>
                        <td class="text-start" style="min-width: 90px;">
                            {{ calculateTotalOrder('order', ledger.items, 'accepted').toLocaleString() }}
                        </td>
                        <td class="text-center" style="min-width: 90px;">
                            {{ calculateTotal('ready', ledger.items).toLocaleString() }}
                        </td>
                        <td class="pe-3 text-end" style="min-width: 90px;">
                            {{ calculateTotal('demand', ledger.items).toLocaleString() }}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <nav v-if="ledger.items" aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item flex-fill" v-for="link in ledger.items.links" :key="link.label"
                        :class="{ 'disabled': !link.url }">
                        <a class="page-link text-center text-dark" href="#" v-if="link.label.includes('Previous')"
                            @click="loadLedgers(link.url, false)">
                            <i class="bi bi-chevron-left"></i>
                        </a>
                        <a class="page-link text-center text-dark" href="#" v-else-if="link.label.includes('Next')"
                            @click="loadLedgers(link.url, false)">
                            <i class="bi bi-chevron-right"></i>
                        </a>
                        <a href="#" :class="{
                            'text-primary fw-bold': this.activePage == link.label,
                            'text-dark': this.activePage != link.label
                        }" class="page-link text-center" v-else @click="loadLedgers(link.url, false)">
                            {{ link.label }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <table class="table table-striped table-borderless">
            <tbody>
                <tr>
                    <td class="ps-3 fw-bold">
                        Readyable Qty
                        <button class="btn btn-sm btn-outline-dark ms-3" @click="showAddOrder">
                            New Order
                        </button>
                    </td>
                    <td class="pe-3 text-end">{{ ledger.readyable_qty ? ledger.readyable_qty.toLocaleString() : 0 }}</td>
                </tr>
                <tr>
                    <td class="ps-3 fw-bold">
                        Demandable Qty
                        <button class="btn btn-sm btn-outline-dark ms-3" @click="showAddDemand">
                            New Demand
                        </button>
                    </td>
                    <td class="pe-3 text-end">{{ ledger.demandable_qty ? ledger.demandable_qty.toLocaleString() : 0 }}
                    </td>
                </tr>
                <tr>
                    <td class="ps-3 fw-bold">
                        Balance Qty
                        <button class="btn btn-sm btn-outline-dark ms-3" @click="showLedgerSummary">
                            Show Ledger
                        </button>
                    </td>
                    <td class="pe-3 text-end">
                        {{ (ledger.total_order - ledger.total_dispatch).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>

        <div>

            <form class="px-3" v-if="addOrder" @submit.prevent="postOrder()" method="post">

                <div class="text-center mb-3 text-bg-dark p-1">Add Order Quantity</div>

                <div class="row mb-3">
                    <div class="col-6">
                        <input type="date" class="form-control" v-model="expected_at" />
                    </div>
                    <div class="col-6">
                        <label class="btn btn-outline-dark rounded-0 w-100" :class="{ active: adjustment }"
                            @click="toggleAdjustment('order')">
                            <input type="checkbox" autocomplete="off" v-model="adjustment"> Adjustment
                        </label>
                    </div>
                </div>


                <textarea class="form-control" v-model="message" placeholder="Enter your message ..."></textarea>

                <div v-if="ledger.stock.product" class="d-flex flex-wrap gap-2 mb-2">
                    <div class="d-flex w-100" v-for="(color, index) in ledger.stock.product.options" :key="index">
                        <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img :src="color.image" class="rounded me-2" style="height: 60px; object-fit: cover">
                        </button>
                        <div class="flex-fill form-floating overflow-hidden">
                            <input type="number" class="form-control" :id="'colorQuantity_' + color.sid"
                                v-model="color.quantity" @input="handleInput(color)" />
                            <label class="text-capitalize" :for="'colorQuantity_' + color.sid">
                                {{ color.name }} Color
                            </label>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-fullscreen">
                                <div class="modal-content">
                                    <button class="btn h-100" data-bs-dismiss="modal" aria-label="Close">
                                        <img :src="color.image" class="h-100"
                                            style="object-fit: cover; object-position: center;">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-warning fw-bold w-100" type="submit">
                    <div class="d-flex justify-content-around">
                        <span>Submit</span>
                        <span>{{ totalColorInputAmount.toLocaleString() }} pcs</span>
                    </div>
                </button>

            </form>

            <form class="px-3" v-if="addDemand" @submit.prevent="postDemand()" method="post">

                <div class="text-center mb-3 text-bg-dark p-1">Add Demand Quantity</div>

                <div class="row mb-3">
                    <div class="col-6">
                        <input type="date" class="form-control" v-model="expected_at" />
                    </div>
                    <div class="col-6">
                        <label class="btn btn-outline-dark rounded-0 w-100" :class="{ active: adjustment }"
                            @click="toggleAdjustment('demand')">
                            <input type="checkbox" autocomplete="off" v-model="adjustment"> Adjustment
                        </label>
                    </div>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text">Tolerance</span>
                    <input type="text" class="form-control" v-model="tolerance">
                    <span class="input-group-text">%</span>
                </div>

                <textarea class="form-control" v-model="message"
                    placeholder="Enter Invoice No. & Delivery Challan No."></textarea>

                <div v-if="ledger.stock.product" class="d-flex flex-wrap gap-2 mb-2">
                    <div class="d-flex w-100" v-for="(color, index) in ledger.stock.product.options" :key="index">
                        <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img :src="color.image" class="rounded me-2" style="height: 60px; object-fit: cover">
                        </button>
                        <div class="flex-fill form-floating overflow-hidden">
                            <input type="number" class="form-control" :id="'colorQuantity_' + color.sid"
                                v-model="color.quantity" @input="handleInput(color)" />
                            <label class="text-capitalize" :for="'colorQuantity_' + color.sid">
                                {{ color.name }} Color
                            </label>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-fullscreen">
                                <div class="modal-content">
                                    <button class="btn h-100" data-bs-dismiss="modal" aria-label="Close">
                                        <img :src="color.image" class="h-100"
                                            style="object-fit: cover; object-position: center;">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-warning fw-bold w-100" type="submit">
                    <div class="d-flex justify-content-around">
                        <span>Submit</span>
                        <span>{{ totalColorInputAmount.toLocaleString() }} pcs</span>
                    </div>
                </button>

            </form>

            <!-- <LedgerOrderDemandForm v-if="addOrder" :add-order="true" :form-title="orderFormTitle" :ledger="ledger"
                @submit-order="postOrder" />
            <LedgerOrderDemandForm v-if="addDemand" :add-demand="true" :form-title="demandFormTitle" :ledger="ledger"
                @submit-demand="postDemand" /> -->
                

        </div>

        <LedgerInfo :items="ledger.items" />

        <ChatButton />

        <ChatModel :dataset="ledger" />

    </div>
</template>

<script>
import LedgerFilters from '@/components/LedgerFilters.vue';
import ChatButton from '@/components/ChatButton.vue';
import ChatModel from '@/components/ChatModel.vue';
import LedgerInfo from '@/components/LedgerInfo.vue';
// import LedgerOrderDemandForm from '@/components/LedgerOrderDemandForm.vue';
export default {
    name: 'CatalogLedger',
    components: {
    LedgerFilters,
    ChatButton,
    ChatModel,
    LedgerInfo,
    // LedgerOrderDemandForm
},
    data() {
        return {
            adjustment: false,
            adjustmentType: null,
            filters: [],
            addOrder: false,
            addDemand: false,
            tolerance: 10,
            message: 'Initial message',
            expected_at: this.calculateExpectedDate(),
            messageDemand: null,
            entryVisible: true,
            activePage: 1,
        }
    },
    created() {
        this.loadLedgers('', true)
    },
    computed: {
        ledger() {
            return this.$store.getters.getLedger
        },
        totalColorInputAmount() {
            if (this.ledger.stock.product) {
                return this.ledger.stock.product.options.reduce((total, color) => total + parseInt(color.quantity || 0), 0);
            }
            return 0;
        },
    },
    methods: {
        calculateExpectedDate() {
            const today = new Date();
            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() + 2);
            return expectedDate.toISOString().split('T')[0];
        },
        loadLedgers(pageurl, firstload) {
            console.log(pageurl)
            this.activePage = 1;
            if (!firstload) {
                this.activePage = pageurl.split('=')[1];
            }
            this.$store.dispatch('fetchStockLedger', {
                ledger_sid: this.$route.params.ledger_sid, page: this.activePage
            })
        },
        toggleAdjustment(type) {
            this.adjustmentType = type;
        },
        showAddOrder() {
            this.addDemand = false;
            this.addOrder = true;
        },
        showAddDemand() {
            this.addOrder = false;
            this.addDemand = true;
        },
        showLedgerSummary() {
            this.addDemand = false;
            this.addOrder = false;
        },
        getTableDataClass(order) {
            switch (order.model) {
                case 'order': return this.filters.order ? 'text-start' : 'text-danger';
                case 'ready': return this.filters.ready ? 'text-center' : 'text-danger';
                case 'demand': return this.filters.demand ? 'text-end' : 'text-danger';
                case 'adjustment': return this.againTry(order);
                default: return 'text-end';
            }
        },
        againTry(order) {
            switch (order.type) {
                case 'order': return this.filters.adjustment ? 'text-start' : 'text-danger';
                case 'ready': return this.filters.adjustment ? 'text-center' : 'text-danger';
                case 'demand': return this.filters.adjustment ? 'text-end' : 'text-danger';
            }
        },
        handleInput(color) {
            if (color && typeof color === 'object') {
                // Ensure the color object and quantity property are defined
                if (color.quantity === undefined) {
                    this.$set(color, 'quantity', 0); // Set a default value if quantity is undefined
                }

                // Ensure the entered value is not less than 0
                color.quantity = Math.max(0, color.quantity);
            }
        },
        getActiveClass(order) {
            return {
                'text-primary': order.status === 'issued',
                'text-warning': order.status === 'cancelled',
                'text-dark': order.status === 'accepted',
            };
        },
        calculateTotal(model, items) {
            if (items && Array.isArray(items)) {
                const filteredItems = items.filter((order) => order.model === model && this.filters[model]);
                return filteredItems.reduce((total, order) => total + order.quantity, 0);
            } else {
                return 0;
            }
        },
        calculateTotalOrder(model, items, status) {
            if (items && Array.isArray(items)) {
                const filteredItems = items.filter((order) => (order.model === model) && this.filters[model] && (order.status === status));
                return filteredItems.reduce((total, order) => total + order.quantity, 0);
            } else {
                return 0;
            }
        },
        formatDate(dateTimeString) {
            const options = {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            };
            const formattedTime = new Date(dateTimeString).toLocaleDateString('en-US', options);
            return formattedTime;
        },
        // order create <= readyable
        postOrder() {
            console.log('90-' + this.totalColorInputAmount)
            if (this.ledger.stock.product.options && this.totalColorInputAmount > 0) {

                const quantities = this.ledger.stock.product.options.map(color => {
                    return this.ledger.stock.product.ranges.map(size => {
                        const key = `${color.sid}_${size.sid}`;
                        const value = color.quantity;
                        return { [key]: value };
                    });
                }).flat();

                if (this.adjustment) {
                    const isQuantityValid = this.totalColorInputAmount <= this.ledger.readyable_qty;
                    if (!isQuantityValid) {
                        console.log('check', isQuantityValid);
                        // this.showQtyError('Oops', 'Max Ready Adjustment can be !' + this.ledger.readyable_qty);
                        this.ledger.stock.product.options.forEach(color => {
                            color.quantity = 0;
                        });
                        return;
                    }
                    const adjustmentData = {
                        ledger_sid: this.ledger.sid,
                        note: this.message,
                        type: this.adjustmentType,
                        quantities: JSON.stringify(quantities),
                    };
                    this.$store.dispatch('postAdjustment', adjustmentData)
                } else {
                    const orderData = {
                        product_sid: this.ledger.product_sid,
                        party_sid: this.ledger.party_id.user.sid,
                        ledger_sid: this.ledger.sid,
                        content: this.message,
                        expected_at: this.expected_at,
                        quantities: JSON.stringify(quantities),
                    };
                    this.$store.dispatch('postOrder', orderData)
                }
            } else {
                console.log('Quantity total is 0 or less or ledger is empty. Skipping post request.');
            }
        },
        postDemand() {
            const quantities = this.ledger.stock.product.options.map(color => {
                return this.ledger.stock.product.ranges.map(size => {
                    const key = `${color.sid}_${size.sid}`;
                    const value = color.quantity;
                    return { [key]: value };
                });
            }).flat();

            if (this.adjustment) {
                const isQtyValid = this.totalColorInputAmount <= this.ledger.dispatchable_qty;
                console.log('disp' + isQtyValid)
                if (!isQtyValid) {
                    console.log('check', isQtyValid);
                    // this.showQtyError('Oops', 'Max Ready Adjustment can be !' + this.ledger.readyable_qty);
                    this.ledger.stock.product.options.forEach(color => {
                        color.quantity = 0;
                    });
                    return;
                }
                const adjustmentData = {
                    ledger_sid: this.ledger.sid,
                    note: this.message,
                    type: this.adjustmentType,
                    quantities: JSON.stringify(quantities),

                };
                this.$store.dispatch('postAdjustment', adjustmentData)

            } else if (this.ledger.stock.product.options && this.totalColorInputAmount > 0) {
                const isQuantityValid = this.totalColorInputAmount <= this.ledger.demandable_qty;

                if (!isQuantityValid) {
                    console.log('check', isQuantityValid);
                    // this.showQtyError('Oops', 'Quantity must be equal or less than Demandable Quantity!');
                    this.ledger.stock.product.options.forEach(color => {
                        color.quantity = 0;
                    });
                    return;
                } else {
                    const demandData = {
                        ledger_sid: this.ledger.sid,
                        content: this.message,
                        expected_at: this.expected_at,
                        quantities: JSON.stringify(quantities),
                        tolerance: this.tolerance
                    };
                    this.$store.dispatch('postDemand', demandData)
                }

            } else {
                console.log('Quantity total is 0 or less or ledger is empty. Skipping post request.');
            }
        },
        handleFiltersChange(filters) {
            this.filters = filters;
        }
    },
}
</script>

<style  scoped>
.custom-offcanvas-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1045;
}

.nav-link.active {
    color: #fff;
    /* background-color: #28CC9E; */
    background-color: #000;
}</style>