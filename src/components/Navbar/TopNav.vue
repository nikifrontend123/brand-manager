<template>
    <div>
        <div class="d-flex justify-content-between px-2 py-1 border" style="background-color: #F48B29;">
            <i @click="goBack()"
                class=" fs-5 bi bi-chevron-left d-flex justify-content-center align-items-center text-white"></i>
            <div class="right" style="font-weight: 500;">
                <p class="m-0 py-2 ps-2 text-white">Brand App</p>
            </div>
            <div class="left d-flex align-items-center">
                <i class="bi bi-list fs-5 text-white" type="button" @click="toggleOffcanvas"></i>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" :class="{ 'show': isOffcanvasOpen }">
                <div class="offcanvas-header border-bottom py-2">
                    <h5 id="offcanvasRightLabel">Menu</h5>
                    <button type="button" class="btn-close" @click="closeOffcanvas"></button>
                </div>
                <div class="offcanvas-body p-0">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <router-link to="/" class="text-decoration-none text-dark">
                                <i class="bi bi-house me-2"></i>
                                <span>Dashboard</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/Catalog" class="text-decoration-none text-dark">
                                <i class="bi bi-layers me-2"></i>
                                <span>Store</span>
                            </router-link>
                        </li>
                        <li class="list-group-item">
                            <router-link to="/PartyPage" class="text-decoration-none text-dark">
                                <i class="bi bi-journal-arrow-up me-2"></i>
                                <span>Parties</span>
                            </router-link>
                        </li>
                        <!-- <li class="list-group-item">
                            <router-link to="/SalesOrder" class="text-decoration-none text-dark">
                                <i class="bi bi-send me-2"></i>
                                <span>Sales</span>
                            </router-link>
                        </li>
                        <li class="list-group-item border-bottom">
                            <router-link to="/SupplierForm" class="text-decoration-none text-dark">
                                <i class="bi bi-speedometer me-2"></i>
                                <span>Manage</span>
                            </router-link>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    data() {
        return {
            isOffcanvasOpen: false,
        };
    },
    methods: {
        toggleOffcanvas() {
            this.isOffcanvasOpen = !this.isOffcanvasOpen;
        },
        closeOffcanvas() {
            this.isOffcanvasOpen = false;
        },
        goBack() {
            window.history.back()
        }
    },
    created() {
        this.$router.afterEach(() => {
            this.closeOffcanvas();
        });
    },
}
</script>

<style lang="scss" scoped></style>