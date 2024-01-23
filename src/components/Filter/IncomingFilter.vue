<template>
    <div class="container py-3">
        <div class="d-flex">
            <div class="form-outline d-flex flex-fill me-1" style="border-radius: 0% !important;">
                <input v-model="searchTerm" @input="updateSearch" type="search" class="form-control"
                    placeholder="Search Incoming Orders"
                    style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px;" />
            </div> 
            <select v-model="selectedFabricator" class="form-select" style="width: 200px;" aria-label="Filter By Fabricator"
                @change="applyFilters">
                <option value="" selected disabled>Filter By Fabricator</option>
                <option v-for="(fabricator, index) in fabricators" :key="index" :value="fabricator">
                    {{ fabricator }}
                </option>
            </select>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FabFilter',
    props: {
        fabricators: Array,
    },
    data() {
        return {
            searchTerm: '',
            selectedFabricator: '',
        }
    },
    created() {
        this.emitFilter();
    },

    methods: {
        applyFilters() {
            this.emitFilter();
        },
        emitFilter() {
            this.$emit('filtersChanged', {
                fabricator: this.selectedFabricator,
                searchTerm: this.searchTerm,
            });
        }, 
        updateSearch() {
            this.emitFilter();
        },
    }
}
</script>

<style  scoped></style>