<template>
    <div>
        <div class="border">
            <FabFilter>
                <div @click="test" class="mx-1">
                    <BtnChange :design="dd"></BtnChange>
                </div>
            </FabFilter>
        </div>
        <div>
            <div class="">
                <CatalogPageV1 :design="dd" :list="list"></CatalogPageV1>
                <CatalogPageV2 :design="dd" :list="list"></CatalogPageV2>
                <CatalogPageV3 :design="dd" :list="list"></CatalogPageV3>
            </div>
        </div>
        <div class="position-fixed bottom-0 text-center w-100">
            <StoreNav></StoreNav>
        </div>
    </div>
</template>

<script>
import BtnChange from './BtnChange.vue';
import FabFilter from '@/components/Filter/FabFilter.vue';
import CatalogPageV2 from '@/components/CatalogVersion/CatalogPageV2.vue';
import CatalogPageV3 from '@/components/CatalogVersion/CatalogPageV3.vue';
import CatalogPageV1 from '@/components/CatalogVersion/CatalogPageV1.vue';
import StoreNav from '@/components/Navbar/StoreNav.vue';

export default {
    props: ["design"],
    components: {
        BtnChange,
        FabFilter,
        CatalogPageV1,
        CatalogPageV2,
        CatalogPageV3,
        StoreNav
    },
    data() {
        return {
            publicPath: process.env.BASE_URL,
            dd: 1
        }
    },

    computed: {
        // lists() {
        //     return this.$store.getters.getLists;
        // },
        lists() {
            return this.$store.getters.getDatas;
        },
        gridSize() {
            switch (this.design) {
                case 1: return 'row-cols-1 row-cols-md-3 row-cols-xl-4';
                case 2: return 'row-cols-2 row-cols-md-3 row-cols-xl-4';
                case 3: return 'row-cols-2 row-cols-md-3 row-cols-xl-4';
            }
            return this.design
        }

    },
    methods: {
        test() {
            switch (this.dd) {
                case 1:
                    this.dd = 2;
                    break;
                case 2:
                    this.dd = 3;
                    break;
                case 3:
                    this.dd = 1;
                    break;
            }
        }

    }

}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
    .list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .btnlist img {
        width: 180px;
        height: 150px;
        object-fit: fill;
    }

    .btnsar {
        margin-top: 10px;
    }
}

@media only screen and (min-width: 601px) {
    .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

.eabtn i:hover {
    color: black;
}
</style>