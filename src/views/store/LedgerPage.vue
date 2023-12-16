<template>
    <div class="pb-5">
        <div class="container my-2">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Order</th>
                        <th scope="col">Ready</th>
                        <th scope="col">Demand</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(entry, index) in ledgerEntries" :key="index">
                        <td>{{ entry.date }}</td>
                        <td>{{ entry.order }}</td>
                        <td>{{ entry.ready }}</td>
                        <td>{{ entry.demand }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ total('order') }}</td>
                        <td>{{ total('ready') }}</td>
                        <td>{{ total('demand') }}</td>
                    </tr>
                </tbody>

            </table>
            <div class="my-2  p-2 d-flex justify-content-between text-white" style="background-color: #F48B29;">
                <p class="mb-0 fw-bold">Demandable Qty</p>
                <p class="mb-0">{{ calculatedDemanableQty }}</p>
            </div>
            <div class="my-2   p-2 d-flex justify-content-between text-white" style="background-color: #F48B29;">
                <p class="mb-0 fw-bold">Balance</p>
                <p class="mb-0">{{ calculatedBalance }}</p>
            </div>
        </div>
        <div class="d-flex justify-content-center position-fixed w-100 bottom-0">
            <!-- <router-link :to="'/CatalogDetails/' + stock.product.sid" class="text-decoration-none"> -->
            <button class="btn border w-100 m-2" style="background-color: #F48B29;">New Order</button>
            <!-- </router-link> -->
            <button class="btn border w-100 m-2" style="background-color: #F48B29;">New Demand</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CatalogLedger',
    data() {
        return {
            ledgerEntries: [
                { date: '23 Dec 23', order: '10000', ready: '', demand: '' },
                { date: '24 Dec 23', order: '5000', ready: '', demand: '' },
                { date: '25 Dec 23', order: '', ready: '6000', demand: '' },
                { date: '26 Dec 23', order: '', ready: '', demand: '3000' },
            ],
            orderQty: 0,
        }
    },
    computed: {
        calculatedDemanableQty() {
            return this.calculateSum('ready') - this.calculateSum('demand');
        },
        calculatedBalance() {
            return this.calculateSum('order') - this.calculateSum('demand');
        },
    },
    methods: {
        calculateSum(property) {
            let sum = 0;

            this.ledgerEntries.forEach(entry => {
                sum += entry[property] ? parseInt(entry[property]) : 0;
            });

            if (property === 'order') {
                this.orderQty = sum; // Update orderQty here
            }

            return sum;
        },
        total(property) {
            return this.calculateSum(property);
        },
    },
}
</script>

<style lang="scss" scoped></style>