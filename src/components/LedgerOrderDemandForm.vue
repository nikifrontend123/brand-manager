<!-- OrderForm.vue -->

<template>
    <form class="px-3" @submit.prevent="handleSubmit" method="post">
        <!-- Common form fields for both addOrder and addDemand -->
        <div class="text-center mb-3 text-bg-dark p-1">{{ formTitle }}</div>

        <div class="row mb-3">
            <div class="col-6">
                <input type="date" class="form-control" v-model="expected_at" />
            </div>
            <div class="col-6">
                <label class="btn btn-outline-dark rounded-0 w-100" :class="{ active: adjustment }"
                    @click="toggleAdjustment">
                    <input type="checkbox" autocomplete="off" v-model="adjustment"> Adjustment
                </label>
            </div>
        </div>

        <textarea class="form-control" v-model="message" placeholder="Enter your message ..."></textarea>

        <!-- Dynamic color inputs -->
        <div v-if="ledger.stock.product" class="d-flex flex-wrap gap-2 mb-2">
            <div class="d-flex w-100" v-for="(color, index) in ledger.stock.product.options" :key="index">
                <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img :src="color.image" class="rounded me-2" style="height: 60px; object-fit: cover">
                </button>
                <div class="flex-fill form-floating overflow-hidden">
                    <input type="number" class="form-control" :id="'colorQuantity_' + color.sid" v-model="color.quantity"
                        @input="handleInput(color)" />
                    <label class="text-capitalize" :for="'colorQuantity_' + color.sid">{{ color.name }} Color</label>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <button class="btn h-100" data-bs-dismiss="modal" aria-label="Close">
                                <img :src="color.image" class="h-100" style="object-fit: cover; object-position: center;">
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
</template>
  
<script>
export default {
    props: {
        addOrder: Boolean,
        addDemand: Boolean,
        formTitle: String,
        ledger: Object, // Assuming ledger is passed as a prop
    },
    data() {
        return {
            expected_at: '',
            adjustment: false,
            message: '',
            totalColorInputAmount: 0,
        };
    },
    methods: {
        toggleAdjustment(type) {
            this.adjustmentType = type;
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
        handleSubmit() {
            // Emit an event based on addOrder or addDemand
            if (this.addOrder) {
                this.$emit('submit-order', { expected_at: this.expected_at, adjustment: this.adjustment, message: this.message });
            } else if (this.addDemand) {
                this.$emit('submit-demand', { expected_at: this.expected_at, adjustment: this.adjustment, message: this.message });
            }
        },
    },
};
</script>
  
<style>/* Add any component-specific styles here */</style>
  