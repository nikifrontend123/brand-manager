<template>
  <div class="navshadow">
    <nav class="navbar fixed-bottom navbar-light bg-light" :class="{ 'navbar-hidden': navbarHidden }">
      <div id="mobile bottomNav">
        <div class="bnav d-flex h-100">
          <div class="bottom-nav w-100 position-fixed " style="bottom: 0px;">
            <div class="bottom-nav w-100 position-absolute" style="height: 5%;">
              <div class="btn-front position-absolute d-flex justify-content-evenly w-100 pt-2"
                style="bottom:0; width: 100%; background-color: #F48B29; ">
                <!-- <div class="d-grid">
                  <RouterLink to="/stock-market" :class="{ 'text-white': currentRoute === 'StockMarket' }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-house-door fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;">Market</p>
                  </RouterLink>
                </div> -->

                <!-- <div class="d-grid">
                  <RouterLink :to="{ path: '/parties' }"
                    :class="{ 'text-white': $route.path === '/parties' || $route.path.startsWith('/parties/') }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-journal-arrow-up fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;margin: 0">Parties</p>
                  </RouterLink>
                </div> -->

                <div class="d-grid">
                  <RouterLink :to="{ path: '/parties' }"
                    :class="{ 'text-white': $route.matched.some(route => route.path === '/parties' || route.path.startsWith('/parties/')) }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-journal-arrow-up fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;margin: 0">Parties</p>
                  </RouterLink>
                </div>

                <div class="d-grid">
                  <RouterLink :to="{ path: '/stocks' }"
                    :class="{ 'text-white': $route.path === '/stocks' || $route.path.startsWith('/stocks/') }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-send fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;margin: 0">Shop</p>
                  </RouterLink>
                </div>
                <div class="d-grid">
                  <RouterLink to="/orders" :class="{ 'text-white': currentRoute === 'FilteredOrders' }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-layers fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;">Orders</p>
                  </RouterLink>
                </div>
                <div class="d-grid">
                  <RouterLink to="/incoming-orders" :class="{ 'text-white': currentRoute === 'IncomingOrders' }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-box-arrow-in-down fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;">Incoming</p>
                  </RouterLink>
                </div>
                <div class="d-grid">
                  <RouterLink to="/purchase" :class="{ 'text-white': currentRoute === 'Purchase' }"
                    style="text-decoration:none;color:black;text-align: center;">
                    <i class="bi bi-house-door fs-4"></i>
                    <p class='mb-1' style="font-size: 14px;">Purchase</p>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevScroll: window.pageYOffset,
      navbarHidden: false
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.pageYOffset;
      if (this.prevScroll > currentScroll) {
        this.navbarHidden = false;
      } else {
        this.navbarHidden = true;
      }
      this.prevScroll = currentScroll;
    },
  }
};
</script>

<style scoped>
.navbar {
  background-color: #f1f1f1;
  height: 72px;
  transition: transform 0.5s;
  transform: translateY(0);
}

.navbar-hidden {
  transform: translateY(100%);
}

.navshadow {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
</style>