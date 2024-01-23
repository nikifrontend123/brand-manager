<template>
  <router-view />
  <div class="position-fixed bottom-0 text-center w-100">
    <StoreNav></StoreNav>
  </div>
</template>
<script >
import StoreNav from '@/components/Navbar/StoreNav.vue';
import Store from './store';
import Pusher from 'pusher-js';
import SweetAlert from './mixing/sweet-alert';
export default {
  components: {
    StoreNav
  },
  computed: {
    hideBottomNav() {
      const hiddenPages = ['FirstPage', 'LoginPage', 'Registration'];
      return hiddenPages.includes(this.$route.name);
    },
  },
  mounted() {
    const pusher = new Pusher('ba095b8c30f78f55d662', {
      cluster: 'ap2',
      debug: true
    });
    const channel = pusher.subscribe('Test-channel');
    channel.bind('Test-event', (data) => {
      this.parseApiAndReloadData(data)
      console.log(data)
    });
  },
  methods: {
    parseApiAndReloadData(data) {
      let message = data.message;
      if (message) {
        var array = message.split('#');
        var event = array[0];
        var payload = array[1];
        this.reloadApiData(event, payload);
      }
    },
    reloadApiData(event, payload = null) {
      switch (event) {

        case 'update_stock':
          if (payload) {
            SweetAlert.showSweetAlert('Done', 'Stock Updated')
            Store.dispatch('fetchShowStocks', { stock_sid: payload })
          }
          break;

        case 'new_ledger':
          if (payload) {
            SweetAlert.showSweetAlert('Ypee!', 'New Ledger Created')
            Store.dispatch('fetchShowStocks', { stock_sid: payload });
          }
          break;

        case 'new_order':
          if (payload) {
            SweetAlert.showSweetAlert('Ypee!', 'New Order Issued')
            Store.dispatch('fetchStockLedger', { ledger_sid: payload, page: 1 })
          }
          break;

        case 'update_order':
          Store.dispatch('fetchOrders');
          if (payload === 'issued') {
            SweetAlert.showSweetAlert('Done', 'Order Re-Issued')
            Store.dispatch('fetchFilteredOrders')
            if (payload === 'accepted') {
              SweetAlert.showSweetAlert('Done', 'Order Accepted')
              Store.dispatch('fetchStockLedger')
            }
            if (payload === 'rejected') {
              SweetAlert.showSweetAlert('Done', 'Order Cancelled')
              Store.dispatch('fetchFilteredOrders')
              Store.dispatch('fetchStockLedger', { ledger_sid: payload, page: 1 })
            }
          } 

          break;

        case 'new_ready':
          if (payload) {
            SweetAlert.showSweetAlert('Done', 'Order Ready Available')
            Store.dispatch('fetchStockLedger', { ledger_sid: payload, page: 1 });
          }
          break;

        case 'new_demand':
          if (payload) {
            SweetAlert.showSweetAlert('Done', 'New Demand Raised')
            Store.dispatch('fetchStockLedger', { ledger_sid: payload, page: 1 });
          }
          break;

        case 'new_dispatch':
          SweetAlert.showSweetAlert('Done', 'New Dispatch On The Way')
          Store.dispatch('fetchDispatch');
          break;

        case 'new_purchase':
          SweetAlert.showSweetAlert('Ypee!', 'Purchase Booked')
          Store.dispatch('fetchDispatch');
          break;

        default: break;
      }
    },
  }
}

</script>
<style>
body {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer/Edge */
}

/* WebKit-specific style to hide the scrollbar */
body::-webkit-scrollbar {
  display: none;
}

.top-brand {
  background-color: #25C297;
  color: white;
  --bs-btn-hover-border-color: none !important;
}

.brand-text {
  color: #25C297;
}


.bg-fullscreen {
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.brand-text {
  color: #25C297;
}

.small {
  font-size: 14px;
}

.smaller {
  font-size: 12px;
}

.truncate {
  
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.truncate-2 {
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

