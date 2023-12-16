<template>
  <div>
    <div class="col" v-for="(list, index) in lists" :key="index">
      <div class="d-flex justify-content-between border-bottom p-2">
        <div class="d-flex">
          <img :src="list.product.image"
            class="rounded-circle border border-1 d-flex justify-content-center align-items-center"
            style="height:60px; width:60px; object-fit: fill;" />
          <div class="ms-2">
            <div class="d-flex align-items-center">
              <p class="fw-bold fs-5 mb-0">{{ list.product.name }}</p> 
            </div>
            <div class="d-flex">
              <span><b>MOQ: </b>{{ list.product.moq }} </span>
              <span class="ms-2"><b>Stock:</b>{{ list.stock }}</span>
              <span class="ms-2"><b>Status:</b></span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-for="(image, imgIndex) in list.colors" :key="imgIndex">
        <div v-for="(size, sizeIndex) in list.sizes" :key="sizeIndex">
          <RouterLink :to="{
            name: 'StockHistory',
            params: {
              listId: list.id,
              colorId: image ? image.id : null,
              sizeId: size ? size.id : null,
            },
          }" class="text-decoration-none text-dark">
            <div class="d-flex flex-column my-2">
              <div class="ms-2">
                <div class="d-flex justify-content-between border-bottom p-2">
                  <div class="d-flex">
                    <img :src="`${publicPath}${image ? image.img : ''}`"
                      class="rounded-circle border border-1 d-flex justify-content-center align-items-center"
                      style="height:60px; width:60px; object-fit: fill;" />
                    <div class="ms-2">
                      <div class="d-flex align-items-center">
                        <p class="fw-bold fs-5 mb-0">{{ list.styleid }}</p>
                        <span class="ms-2">|<b> Stock:</b> {{ list.total }}</span>
                      </div>
                      <div class="d-flex">
                        <span><b>Color:</b> {{ image ? image.name : '' }}</span>
                        <span class="ms-2"><b>Size:</b> {{ size ? size.name : '' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div> -->
    </div>

    <div class="position-fixed bottom-0 text-center w-100">
      <StoreNav></StoreNav>
    </div>
  </div>
</template>
  
<script>
import StoreNav from '@/components/Navbar/StoreNav.vue';
import pusherApi from '@/mixing/pusherApi';
export default {
  mixins:[pusherApi],
  components: {
    StoreNav,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  // computed: {
  //   lists() {
  //     return this.$store.getters.getLists;
  //   },
  // },
  created(){
    this.connect('fetchStocks')
  },
  mounted() {
    this.$store.dispatch('fetchStocks')
  },
  computed: {
    lists() {
      return this.$store.getters.getStocks;
    },
  },
};
</script>
  
<style lang="scss" scoped>
.form-check-input:checked {
  background-color: green;
  border-color: green;
}
</style>
  