<template>
    <div class="container py-3">
        <div class="form-outline d-flex flex-fill" style="border-radius: 0% !important;">
            <input v-model="searchTerm" @input="updateSearch" type="search" class="form-control"
                placeholder="Search Parties"
                style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px;" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartiesFilter',
    data() {
        return {
            searchTerm: '',
        }
    },
    methods: {
        updateSearch() {
            console.log('Updating search term:', this.searchTerm);
            this.$emit('search-update', { searchTerm: this.searchTerm });
        },
    }
}
</script>

<style scoped></style>
