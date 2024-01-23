<template>
    <div class="card">

        <div v-if="stock && stock.product" class="d-flex justify-content-between align-items-center border-bottom">
            <div class="d-flex align-items-center w-100 gap-2">
                <router-link class="btn" :to="'/stocks/' + stockSid">
                    <i class="bi bi-chevron-left"></i>
                </router-link>
                <img :src="stock.product.image" data-bs-toggle="modal" data-bs-target="#imgModal" style="height: 80px">
                <div class="flex-fill d-flex" data-bs-toggle="collapse" data-bs-target="#productinfoModal"
                    aria-expanded="false" aria-controls="productinfoModal">
                    <div class="flex-fill d-flex flex-column justify-content-evenly h-100">
                        <span class="fw-bold">
                            {{ stock.code }}
                        </span>
                        <div class="d-flex flex-column">
                            <div class="d-flex">
                                <span class="me-1">Ready:</span>
                                <div v-if="readyable" class="d-flex">
                                    <strong>{{ readyable }}</strong>
                                    <span>pcs</span>
                                </div>
                                <span v-else>Nothing</span>
                            </div>
                            <div class="d-flex">
                                <span class="me-1">Dispatch:</span>
                                <div v-if="dispatchable" class="d-flex">
                                    <strong>{{ dispatchable }}</strong>
                                    <span class="ps-1">pcs</span>
                                </div>
                                <span v-else>Nothing</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn">
                        <i class="bi bi-chevron-down"></i>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="stock && stock.product" class="card-header rounded-0">
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">
                    {{ stock.product.name }}
                </span>
                <div class="btn btn-dark rounded-0">
                    <i class="bi bi-arrow-down-up" data-bs-toggle="collapse" href="#ledgerFilter" role="button"
                        aria-expanded="false" aria-controls="ledgerFilter"></i>
                </div>
            </div>
        </div>
        <div v-if="stock && stock.product" class="modal fade" id="imgModal" tabindex="-1" aria-labelledby="imgModal"
            aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <button type="button" class="btn h-100 w-100 p-0" data-bs-dismiss="modal" aria-label="Close">
                    <img v-if="stock.product" :src="stock.product.preview" class="w-100" style="object-fit: cover">
                </button>
            </div>
        </div>

        <!-- Info -->
        <div v-if="stock && stock.product" class="collapse" id="productinfoModal">
            <div v-if="stock.product" class="modal-body">
                <p class="text-dark mb-0 border p-1">Name: {{ stock.product.name }}</p>
                <p class="text-dark mb-0 border p-1">Total Demand: {{ stock.total_demands }}</p>
                <p class="text-dark mb-0 border p-1">Pending Ready: {{ stock.ready_balance }}</p>
                <p class="text-dark mb-0 border p-1">Total Orders: {{ stock.total_orders }}</p>
            </div>
        </div>


        <!-- Filters -->
        <div class="collapse" id="ledgerFilter">
            <div class="p-3 border-top" style="background-color: #00000020;">
                <div class="d-flex align-items-center mb-2">
                    <div class="flex-fill">
                        <label for="startDate" class="form-label">Start Date:</label>
                        <input type="date" v-model="startDate"
                            class="form-control rounded-0 border border-secondary border-end-0" id="startDate">
                    </div>

                    <div class="flex-fill">
                        <label for="endDate" class="form-label">End Date:</label>
                        <input type="date" v-model="endDate" class="form-control rounded-0 border border-secondary"
                            id="endDate">
                    </div>
                </div>
                <label class="form-label text-start">Filter By Request Type:</label>
                <div class="btn-group-toggle d-flex justify-content-between" data-toggle="buttons">
                    <label class="btn btn-outline-dark rounded-0 flex-fill border-secondary border-end-0"
                        :class="{ active: ready }" @click="toggleCheckbox('ready')">
                        <input type="checkbox" autocomplete="off" v-model="ready"> Ready
                    </label>
                    <label class="btn btn-outline-dark rounded-0 flex-fill border-secondary border-end-0"
                        :class="{ active: order }" @click="toggleCheckbox('order')">
                        <input type="checkbox" autocomplete="off" v-model="order"> Order
                    </label>
                    <label class="btn btn-outline-dark rounded-0 flex-fill border-secondary border-end-0"
                        :class="{ active: demand }" @click="toggleCheckbox('demand')">
                        <input type="checkbox" autocomplete="off" v-model="demand"> Demand
                    </label>
                    <label class="btn btn-outline-dark rounded-0 flex-fill border-secondary" :class="{ active: adjustment }"
                        @click="toggleCheckbox('adjustment')">
                        <input type="checkbox" autocomplete="off" v-model="adjustment"> Adjustment
                    </label>
                </div>
                <button class="btn btn-dark w-100 mt-2" @click="emitFilters">Apply Filters</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LedgerFilters',
    props: {
        stock: Object,
        readyable: Number,
        dispatchable: Number
    },
    data() {
        const today = new Date();
        const nineDaysAgo = new Date();
        nineDaysAgo.setDate(today.getDate() - 9);
        const oneDayAfter = new Date();
        oneDayAfter.setDate(today.getDate() + 1);
        return {
            stockSid: null,
            ready: true,
            order: true,
            demand: true,
            adjustment: true,
            startDate: nineDaysAgo.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
            endDate: oneDayAfter.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
        }
    },
    mounted() {
        this.stockSid = this.$route.params.stock_sid

        this.emitFilters()
    },
    methods: {
        toggleCheckbox(checkbox) {
            this[checkbox] = !this[checkbox];
        },
        emitFilters() {
            this.$emit('filters-changed', {
                startDate: this.startDate,
                endDate: this.endDate,
                ready: this.ready,
                order: this.order,
                demand: this.demand,
                adjustment: this.adjustment,
            });
        },
    },
}
</script>
