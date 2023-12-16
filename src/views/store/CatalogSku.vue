<template>
  <div>

    <div class="d-flex flex-column my-2">
      <div v-for="(stock, index) in stocks" :key="index">
        <div class="d-flex">
          <div class="d-flex justify-content-between border-bottom p-2">
            <div class="d-flex">
              <div class="ms-2">
                <div class="d-flex align-items-center">
                  <p class="fw-bold fs-5 mb-0">{{ stock.sku }}</p>
                  <!-- <span>{{ stock }}</span> -->
                  <span class="ms-2">|<b> Quantity:</b> {{ stock.quantity }}</span>
                </div>
                <!-- <div class="d-flex">
                  <span><b>Color:</b> {{ image.name }}</span>
                  <span class="ms-2"><b>Size:</b> {{ size.name }}</span>
                </div> -->
              </div>
            </div>
            <!-- <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked
                :id="'flexSwitchCheckChecked_' + index + imgIndex + sizeIndex" :disabled="list.disabled"
                v-model="list.selectedSizes[size.id + '_' + image.id]" @click="toggleSizeColor(list, size.id, image.id)">
            </div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="position-fixed bottom-0 text-center w-100">
    <StoreNav></StoreNav>
  </div>
</template>

<script>
import StoreNav from '@/components/Navbar/StoreNav.vue';
// import axios from 'axios';
import pusherApi from '@/mixing/pusherApi';
export default {
  mixins: [pusherApi],
  components: {
    StoreNav
  },
  data() {
    return {
      // stocks: [],
      publicPath: process.env.BASE_URL,
    };
  },
  created() {
    this.connect('fetchCatalogSku')
  },
  mounted() {
    this.$store.dispatch('fetchCatalogSku')
    // axios.get('http://192.168.1.133:8001/api/stocks?type=sku')
    //   .then(response => {
    //     // Access the 'data' property in the API response
    //     this.stocks = response.data.data;
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  },
  computed: {
    stocks() {
      return this.$store.getters.getCatalogSku;
    },
  },
  methods: {
    // toggleSizeColor(list, sizeId, colorId) {
    //   const key = sizeId + '_' + colorId;
    //   if (list.selectedSizes[key]) {
    //     console.log('Selected: Size ID', sizeId, 'Color ID', colorId);
    //   } else {
    //     console.log('Deselected: Size ID', sizeId, 'Color ID', colorId);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.form-check-input:checked {
  background-color: green;
  border-color: green;
}
</style>
