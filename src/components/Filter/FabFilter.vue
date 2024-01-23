<template>
    <div class="container py-3">
        <div class="d-flex">
            <div class="input-group">
                <div class="form-outline d-flex flex-fill" style="border-radius: 0% !important;">
                    <input v-model="tagSearch" type="search" id="form1" class="form-control" placeholder="Search Stocks"
                        style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px; " />

                    <!-- <button type="button" class="btn btn-primary"
                        style="border-top-left-radius: 0% !important; border-bottom-left-radius: 0%;">
                        <i class="bi bi-search"></i>
                    </button> -->
                </div>
            </div>
            <div class="d-flex">
                <div class="mx-1 ms-2 btn btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <i class="bi bi-funnel fs-4"></i>
                </div>
                <div class="mx-1 ms-2 btn btn-outline-primary" @click="toggleSortOrder">
                    <i v-if="ascending" class="bi bi-arrow-down fs-4"></i>
                    <i v-else class="bi bi-arrow-up fs-4"></i>
                </div>
                <slot></slot>
            </div>
        </div>

        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"
            style="height:80vh ;">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                <div class="d-flex">
                    <button @click="resetFilters" data-bs-dismiss="offcanvas" aria-label="Close"
                        class="btn py-2 px-4 mx-2 btn-light"
                        style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">Reset</button>
                    <button @click="applyFilters" data-bs-dismiss="offcanvas" aria-label="Close"
                        class="btn py-2 px-4 mx-2 btn-light"
                        style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">Apply</button>
                </div>

            </div>
            <div class="offcanvas-body">
                <select v-model="selectedFabricator" class="form-select py-3 mb-3" aria-label="Filter By Fabricator">
                    <option value="" selected disabled>Filter By Fabricator</option>
                    <option v-for="(fabricator, index) in fabricators" :key="index" :value="fabricator">
                        {{ fabricator }}
                    </option>
                </select>

                <select v-model="selectedColor" class="form-select py-3 mb-3" aria-label="Filter By Color">
                    <option value="" selected disabled>Filter By Color</option>
                    <option v-for="(color, index) in colors" :key="index" :value="color">
                        {{ color }}
                    </option>
                </select>

                <select v-model="selectedSize" class="form-select py-3 mb-3" aria-label="Filter By Size">
                    <option value="" selected disabled>Filter By Size</option>
                    <option v-for="(size, index) in sizes" :key="index" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    name: 'FabFilter',
    props: {
        colors: Array,
        sizes: Array,
        fabricators: Array,
        filteredStocks: Array,
    },
    data() {
        return {
            tagSearch: '',
            selectedFabricator: '',
            selectedColor: '',
            selectedSize: '',
            isScrollingDown: false,
            prevScrollPos: window.pageYOffset,

        }
    },
    watch: {
        tagSearch(newValue) {
            this.$emit('tagSearchChanged', newValue);
        },
        selectedColor() {
            this.emitFilter();
        },
        selectedSize() {
            this.emitFilter();
        },
    },
    methods: {
        applyFilters() {
            this.$emit('filtersChanged', {
                fabricator: this.selectedFabricator,
                color: this.selectedColor,
                size: this.selectedSize,
            });
        },
        emitFilter() {
            this.$emit('filtersChanged', {
                fabricator: this.selectedFabricator,
                color: this.selectedColor,
                size: this.selectedSize,
            });
        },
        sortByStock(order) {
            // Emit an event to notify the parent component about the sorting request
            this.$emit('sortByStock', order);
        },
        toggleSortOrder() {
            this.ascending = !this.ascending;
            this.$emit('sortByStock', this.ascending ? 'asc' : 'desc');
        },
        resetFilters() {
            this.selectedFabricator = '';
            this.selectedColor = '';
            this.selectedSize = '';

            this.$emit('filtersChanged', {
                fabricator: '',
                color: '',
                size: '',
            });
        },
    },
}
</script>

<style  scoped>
.selected-color {
    border: 1px solid black;
}

.container {
    transition: transform 0.3s ease-in-out;
}

.hide-on-scroll {
    transform: translateY(-200%);
}

.accordion-button:not(.collapsed) {
    background-color: #0d6efd;
    color: #ffffff;
    box-shadow: none;
}
</style>



























 
 