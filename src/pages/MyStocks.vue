<template>
    <div>
         <div class="border">
            <FabFilter :tagSearch="tagSearch" :colors="colors" :sizes="sizes" :fabricators="fabricators"
                :filteredStocks="filteredStocks" :sortOrder="sortOrder" @tagSearchChanged="updateTagSearch"
                @filtersChanged="handleFiltersChanged" @sortByStock="sortByStock">
                <div @click="test" class="mx-1">
                    <BtnChange :design="dd"></BtnChange>
                </div>
            </FabFilter>
        </div>
        <div>
            <div class="">
                <CatalogPageV1 :design="dd" :stock="filteredStocks"></CatalogPageV1>
                <CatalogPageV2 :design="dd" :stock="filteredStocks"></CatalogPageV2>
                <CatalogPageV3 :design="dd" :stock="filteredStocks"></CatalogPageV3>
            </div>
        </div>
        <div class="position-fixed bottom-0 text-center w-100">
            <StoreNav></StoreNav>
        </div>
    </div>
</template>

<script>
import BtnChange from '@/components/BtnChange.vue';
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
            dd: 1,
            tagSearch: '',
            selectedColor: '',
            selectedSize: '',
            selectedFabricator: '',
            sortOrder: null,
        }
    },
    watch: {
        tagSearchChanged(newValue) {
            this.tagSearch = newValue;
        },
    },

    computed: {
        fabricators() {
            const uniqueFabricators = new Set();

            if (this.stocks) {
                this.stocks.forEach(stock => {
                    const assignedParties = stock.assigned_parties || [];

                    assignedParties.forEach(party => {
                        if (party.name) {
                            uniqueFabricators.add(party.name);
                        }
                    });
                });
            }

            return Array.from(uniqueFabricators);
        },

        colors() {
            const uniqueColors = new Set();

            if (this.stocks) {
                this.stocks.forEach(stock => {
                    const product = stock.product || {};
                    const options = product.options || [];

                    options.forEach(option => {
                        if (option.name) {
                            uniqueColors.add(option.name);
                        }
                    });
                });
            }

            return Array.from(uniqueColors);
        },

        sizes() {
            const uniqueSizes = new Set();

            if (this.stocks) {
                this.stocks.forEach(stock => {
                    const product = stock.product || {};
                    const ranges = product.ranges || [];

                    ranges.forEach(range => {
                        if (range.name) {
                            uniqueSizes.add(range.name);
                        }
                    });
                });
            }

            return Array.from(uniqueSizes);
        },

        filteredStocks() {
            let tempStocks = this.stocks || [];

            const selectedTags = this.selectedTags || [];
 
            if (selectedTags.length > 0) {
                tempStocks = tempStocks.filter((stock) => {
                    const stockTags = stock.tags.split(',');
                    return stockTags.some(tag => selectedTags.includes(tag.trim()));
                });
            }
            if (this.tagSearch !== '') {
                const searchTerm = this.tagSearch.toLowerCase();
                tempStocks = tempStocks.filter((stock) => {
                    const stockTags = stock.tags.split(',');
                    return stockTags.some(tag => tag.toLowerCase().includes(searchTerm.trim()));
                });
            } 
            if (this.selectedColor || this.selectedSize || this.selectedFabricator) {
                tempStocks = this.filterStocksByColorAndSize(
                    tempStocks,
                    this.selectedColor,
                    this.selectedSize,
                    this.selectedFabricator
                );
            } 
            if (this.sortOrder) {
                this.sortByStock(this.sortOrder);
            }
            return tempStocks;
        },

        stocks() {
            const paramPartyId = this.$route.params.partysid;
            const allStocks = this.$store.getters.getStocks;

            if (paramPartyId) {
                return allStocks.filter(stock => {
                    return stock.assigned_parties && Array.isArray(stock.assigned_parties) &&
                        stock.assigned_parties.some(party => party.sid === paramPartyId);
                });
            } else {
                return allStocks;
            }
        },
        gridSize() {
            switch (this.design) {
                case 1: return 'row-cols-1 row-cols-md-3 row-cols-xl-4';
                case 2: return 'row-cols-2 row-cols-md-3 row-cols-xl-4';
                case 3: return 'row-cols-2 row-cols-md-3 row-cols-xl-4';
            }
            return this.design;
        }
    },
    methods: {
        handleFiltersChanged({ color, size, fabricator }) {
            this.selectedFabricator = fabricator;
            this.selectedColor = color;
            this.selectedSize = size;
            this.sortOrder = null;
        },

        sortByStock(order) {
            this.sortOrder = order;
            this.filteredStocks.sort((a, b) => {
                const stockQuantityA = parseInt(a.stock);
                const stockQuantityB = parseInt(b.stock);

                if (order === 'asc') {
                    return stockQuantityA - stockQuantityB;
                } else if (order === 'desc') {
                    return stockQuantityB - stockQuantityA;
                }

                return 0; 
            });
        },
        filterStocksByColorAndSize(stocks, selectedColor, selectedSize, selectedFabricator) {
            return stocks.filter((stock) => {
                const product = stock.product || {};
                const options = product.options || [];
                const ranges = product.ranges || [];
                const assignedParties = stock.assigned_parties || []; 
                const selectedOptionColor = options.find((option) => option.sid === selectedColor);
                const selectedOptionSize = ranges.find((range) => range.sid === selectedSize);
                console.log('Selected Option Size:', selectedOptionSize);

                const sizeNames = ranges.map((range) => range.name.toLowerCase());
                console.log('Size Names:', sizeNames);

                const sizeMatch = selectedSize === '' || sizeNames.includes(selectedSize.toLowerCase());
                const stockColor = selectedOptionColor ? selectedOptionColor.name.toLowerCase() : ''; 

                const colorMatch = selectedColor === '' || (selectedOptionColor && stockColor === selectedColor.toLowerCase()); 

                const fabricatorMatch = selectedFabricator === '' || assignedParties.some(party => party.name === selectedFabricator);

                return colorMatch && sizeMatch && fabricatorMatch;
            });
        },
 
        updateTagSearch(newSearch) {
            this.tagSearch = newSearch;
        },

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
    },
    mounted() {
        let paramParty = this.$route.params.partysid;
        if (paramParty) {
            console.log(paramParty)
        }
    },

}
</script>