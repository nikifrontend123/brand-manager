<template>
    <div class=" container d-flex my-2">
        <div class="form-outline d-flex flex-fill" style="border-radius: 0% !important;">
            <input v-model="searchTerm" @input="updateSearch" type="search" class="form-control" placeholder="Search Orders"
                style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px;" />
        </div>
        <div class="mx-2">
            <button class="dropdown-menu" aria-labelledby="statusDropdown btn btn-secondary dropdown-toggle" type="button"
                id="statusDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) }}
            </button>
            <div class="input-group   h-100">
                <select class="form-select" id="status-select" :value="selectedStatus" @input="updateStatus">
                    <option value="issued">Issued</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <!-- <option value="cancelled">Cancelled</option> -->
                </select>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FabFilter',
    data() {
        return {
            searchTerm: '',
            selectedStatus: 'rejected',
        }
    },
    created() {
        this.$emit('search-updated', { searchTerm: this.searchTerm, status: this.selectedStatus });
    },
    methods: {
        updateStatus(event) {
            this.selectedStatus = event.target.value;
            this.$emit('search-updated', { searchTerm: this.searchTerm, status: this.selectedStatus });
        },
        updateSearch() {
            this.$emit('search-updated', { searchTerm: this.searchTerm, status: this.selectedStatus });
        },
    },
    
}
</script>

<style  scoped></style>