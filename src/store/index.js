import { createStore } from "vuex";
import axiosinstance from '@/axiosPort';
export default createStore({
  state: {
    stocks: [],
    purchases: [],
    markets: [],
    parties: [],
    users: [],
    fabParty: [],
    ledgers: [], 
    dispatches: [],
    showStock: {},
    ledger: [],
    filteredOrders: [],
    action: false, 
  },
  getters: {
    getOrders: state => state.orders,
    getFabParties: state => state.fabParty,
    getLedgerss: state => state.ledgers,
    getParties: state => state.parties,
    getIsLive: state => state.isLive,
    getStatus: (state) => (state.isLive ? 'Live' : 'Draft'),
    getMarkets: state => state.markets,
    getStocks: state => state.stocks,
    getPurchases: state => state.purchases,
    getUsers: state => state.users,
    getDispatches: state => state.dispatches,
    getShowStock: state => state.showStock,
    getLedger: state => state.ledger,
    getFilteredOrders: state => state.filteredOrders,
  },
  mutations: {
    setLedgers(state, data) {
      state.ledgers = data
    },
    setFabParties(state, data) {
      state.fabParty = data
    },
    addToFabricator(state, data) {
      state.fabricator.push(data)
    },
    toggleIsLive(state) {
      state.isLive = !state.isLive;
    },
    setShowStock(state, data) {
      state.showStock = data
    },
    setStock(state, data) {
      state.stocks = data
    },
    setPuchase(state, data) {
      state.purchases = data
    },
    setMarket(state, data) {
      state.markets = data
    },
    setParties(state, data) {
      state.parties = data
    },
    setDispatch(state, data) {
      state.dispatches = data
    },
    setLedger(state, data) {
      state.ledger = data
    },
    actionDone(state) {
      state.action = true;
    },
    setFilteredOrders(state, data) {
      state.filteredOrders = data;
    },
    setUsers(state, data) {
      state.users = data
    },
   
  },
  actions: {
    // ----Parties----
    fetchParties({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('parties?api_secret=api123', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setParties', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchParties:', error) })
    },
    fetchPartiesFab({ commit }, productSid) {
      const token = localStorage.getItem('token')
      axiosinstance.get('parties?role=fabricator&&product_sid=' + productSid, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setFabParties', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchPartiesFab:', error) })
    },
    fetchUsers({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('users?party=not_created', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setUsers', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchUsers:', error) })
    },

    // ----stocks----
    fetchStocks({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('stocks', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setStock', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('fetchStocks:', error) })
    },
    fetchShowStocks({ commit }, data) {
      const token = localStorage.getItem('token')
      axiosinstance.get('stocks/' + data.stock_sid, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setShowStock', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('fetchShowStocks:', error) })
    },
    fetchStockLedger({ commit }, payload) {
      const token = localStorage.getItem('token')

      axiosinstance.get('ledgers/' + payload.ledger_sid + '?page=' + payload.page, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((response) => {
          commit('setLedger', response.data.data)
        })
        .catch((error) => {
          console.error('Error fetching ledger:', error);
        });
    },

    // ----purchase----
    fetchPurchase({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('purchases', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setPuchase', response.data.data)
          }
          else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchPurchase:', error) })
    },

    // ----Market----
    fetchMarket({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('ds/products', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setMarket', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchMarket:', error) })
    },

    // ----Orders----
    fetchFilteredOrders({ commit }, payload) {
      const token = localStorage.getItem('token');
      return axiosinstance.get('orders', {
        params: { status: payload },
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setFilteredOrders', response.data.data);
          } else if (response.data.status === 'error') {
            console.error('Error fetching orders:', response.data.message);
          } else {
            console.error('Something went wrong! Please try again.');
          }

          return response.data;
        })
        .catch((error) => {
          console.error('fetchFilteredOrders:', error);
          throw error;
        });
    },

    // ----incoming----
    fetchDispatch({ commit }) {
      const token = localStorage.getItem('token')
      axiosinstance.get('dispatches', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setDispatch', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchDispatch:', error) })
    },

    // ----AllPost&Put----
    postDemand({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.post('demands', data,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'pending') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('new demand:', error);
        })
    },
    postOrder({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.post('orders', data,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'ok') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('new order:', error);
        })
    },
    postAdjustment({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.post('adjustments', data,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'ok') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('adjustment:', error);
        })
    },
    postCreateLedger({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.post('ledgers', data,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'ok') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('createLedger:', error);
        })
    },
    putCanceleOrder({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.put('orders/' + data, { status: 'cancelled' },
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            commit('actionDone');
          }
        })
        .catch((error) => {
          console.error('putCanceleOrder:', error);
        });
    },
    postDispatch({ commit }, data) {
      const token = localStorage.getItem('token')
      axiosinstance.post('purchases', data,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'ok') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('dispatch:', error);
        })
    },
    putReorderPurchase({ commit }, data) {
      const token = localStorage.getItem('token')

      axiosinstance.put('orders/' + data, {
        message: 'Reissue',
        status: 'issued'
      },
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 'ok') {
            commit('actionDone')
          }
        })
        .catch((error) => {
          console.error('createLedger:', error);
        })
    },

    addToFabricator({ commit }, data) {
      commit('addToFabricator', data)
    },
    addToList({ commit }, data) {
      commit('addToList', data)
    },
  },
  modules: {},
});
