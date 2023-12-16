import { createStore } from "vuex";
import axios from 'axios';

export default createStore({
  state: {
    fabricator: [
      {
        id: 1,
        img: 'http://dillisix.com/storage/56/Dheeraj-Sardar.jpeg',
        status: 'Access Granted',
        role: 'Admin',
        assignee_code: '23',
        name: 'Dheeraj Sardar',
        contact: '665588744',
        email: 'dhes@gmail.com',
        password: '95622wee',
      },
      {
        id: 2,
        img: 'http://dillisix.com/storage/83/IMG20230404151417.jpg',
        status: 'Access Granted',
        role: 'Assignee',
        assignee_code: '23',
        name: 'Hari Shankar Sharma',
        contact: '665588744',
        email: 'hari@gmail.com',
        password: '95622wee',
      },
      {
        id: 3,
        img: 'http://dillisix.com/storage/54/kedar.jpg',
        status: 'Access Granted',
        role: 'Assignee',
        assignee_code: '23',
        name: 'Kedar',
        contact: '665588744',
        email: 'hari@gmail.com',
        password: '95622wee',
      },
    ],
    suppliers: [],
    jobWorks: [],
    stocks: [],
    purchases: [],
    markets: [],
    skus: [],
    parties: [],
    catalogSku: [],
    activeImg: {},
    createParty: [],
    users: [],
    ledgerEntries: [
      {
        date: '23 Dec 23', order: 10000, ready: '', demand: '',
        color: [
          {
            img: 'https://fabricpandit.com/cdn/shop/files/fabric-pandit-fabric-peacock-blue-color-plain-cotton-satin-fabric-width-42-inches-36447076286639_1400x.jpg?v=1686052205',
            qty: 5000
          },
          {
            img: "https://recovo.co/wp-content/uploads/2023/04/portadas-NEWSLETTER-98.jpg",
            qty: 5000
          },
        ]
      },
      {
        date: '24 Dec 23', order: 5000, ready: '', demand: '',
        color: [
          {
            img: 'https://fabricpandit.com/cdn/shop/files/fabric-pandit-fabric-peacock-blue-color-plain-cotton-satin-fabric-width-42-inches-36447076286639_1400x.jpg?v=1686052205',
            qty: 2500
          },
          {
            img: "https://recovo.co/wp-content/uploads/2023/04/portadas-NEWSLETTER-98.jpg",
            qty: 2500
          },
        ]
      },
      {
        date: '25 Dec 23', order: '', ready: 6000, demand: '',
        color: [
          {
            img: 'https://fabricpandit.com/cdn/shop/files/fabric-pandit-fabric-peacock-blue-color-plain-cotton-satin-fabric-width-42-inches-36447076286639_1400x.jpg?v=1686052205',
            qty: 3000
          },
          {
            img: "https://recovo.co/wp-content/uploads/2023/04/portadas-NEWSLETTER-98.jpg",
            qty: 3000
          },
        ]
      },
      {
        date: '26 Dec 23', order: '', ready: '', demand: 3000,
        color: [
          {
            img: 'https://fabricpandit.com/cdn/shop/files/fabric-pandit-fabric-peacock-blue-color-plain-cotton-satin-fabric-width-42-inches-36447076286639_1400x.jpg?v=1686052205',
            qty: 1500
          },
          {
            img: "https://recovo.co/wp-content/uploads/2023/04/portadas-NEWSLETTER-98.jpg",
            qty: 1500
          },
        ]
      },
    ],
    activeEntry: {}
  },
  getters: {
    getActiveEntry: state => state.activeEntry,
    getLedgers(state) {
      return state.ledgerEntries
    },
    getParties(state) {
      return state.parties
    },
    getFabricator(state) {
      return state.fabricator
    },
    getSuppliers(state) {
      return state.suppliers
    },
    getIsLive(state) {
      return state.isLive;
    },
    getStatus: (state) => (state.isLive ? 'Live' : 'Draft'),
    getDatas(state) {
      return state.datas
    },
    getDatapps(state) {
      return state.datapps
    },
    getCards(state) {
      return state.cards
    },
    getLists(state) {
      return state.lists
    },
    getList: (state) => (listId) => {
      let index = state.lists.findIndex(list => list.id == listId);
      return state.lists[index];
    },
    // getSupplier: (state) => (sId) => {
    //   let index = state.suppliers.findIndex(s => s.id == sId);
    //   return state.suppliers[index];
    // },
    getMarkets(state) {
      return state.markets
    },
    getSkus(state) {
      return state.skus
    },
    getjobWorks(state) {
      return state.jobWorks
    },
    getStocks(state) {
      return state.stocks
    },
    getPurchases(state) {
      return state.purchases
    },
    getCatalogSku: state => state.catalogSku,
    getCreateParty: state => state.createParty,
    getUsers: state => state.users,
    getActiveImg(state) {
      return state.activeImg
    },

  },
  mutations: {
    addToFabricator(state, data) {
      state.fabricator.push(data)
    },
    toggleIsLive(state) {
      state.isLive = !state.isLive;
    },
    Jobwork(state, data) {
      state.jobWorks = data
    },
    setSuppliers(state, data) {
      state.suppliers = data
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
    setSku(state, data) {
      state.skus = data
    },
    setParties(state, data) {
      state.parties = data
    },
    addToSupplier(state, data) {
      state.suppliers.push(data)
    },
    setCatalogSku(state, data) {
      state.catalogSku = data
    },
    showActiveImg(state, data) {
      state.activeImg = data
    },
    hideActiveImg(state) {
      state.activeImg = {}
    },
    showActiveEntry(state, data) {
      state.activeEntry = data
    },
    hideActiveEntry(state) {
      state.activeEntry = {}
    },
    setCreateParty(state, data) {
      state.createParty = data
    },
    setUsers(state, data) {
      state.users = data
    },
  },
  actions: {
    addToFabricator({ commit }, data) {
      commit('addToFabricator', data)
    },
    fetchJobWorks({ commit }) {
      axios.get('http://192.168.1.133:8001/api/purchaseorders')
        .then(response => {
          if (response.data.status === 'ok') {
            commit('Jobwork', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('fetchJobWorks:', error) })
    },
    // fetchJobWorks({commit}, data){
    //   commit('Jobwork', data)
    // },
    fetchSuppliers({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/suppliers', {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setSuppliers', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('fetchSuppliers:', error) })
    },
    fetchStocks({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/stocks', {
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
    fetchPurchase({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/purchases', {
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
    fetchMarket({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/ds/products', {
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
        .catch((error) => { console.error('fetchJobWorks:', error) })
    },
    fetchSku({ commit }) {
      axios.get('http://192.168.1.133:8001/api/ds/product_skus')
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setSku', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchSku:', error) })
    },
    fetchCatalogSku({ commit }) {
      axios.get('http://192.168.1.133:8001/api/stocks?type=sku')
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setCatalogSku', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchSku:', error) })
    },
    fetchParties({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/parties?api_secret=api123', {
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
    fetchUsers({ commit }) {
      const token = localStorage.getItem('token')
      axios.get('http://192.168.1.133:8001/api/users', {
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
    fetchCreateParty({ commit }) {
      const token = localStorage.getItem('token');
      // const api_secret = 'api123';
      axios.get('http://192.168.1.133:8001/api/parties?api_secret=api123', {
        headers: { "Authorization": `Bearer ${token}`, }

      })
        .then(response => {
          if (response.data.status === 'ok') {
            commit('setCreateParty', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchCreateParty:', error) })
    },
    addToList({ commit }, data) {
      commit('addToList', data)
    },
    addToSupplier({ commit }, data) {
      commit('addToSupplier', data)
    },
    showActiveImg({ commit }, data) {
      commit('showActiveImg', data)
    },
    hideActiveImg({ commit }, data) {
      commit('hideActiveImg', data)
    },
    showActiveEntry({ commit }, data) {
      commit('showActiveEntry', data)
    },
    hideActiveEntry({ commit }, data) {
      commit('hideActiveEntry', data)
    },
  },
  modules: {},
});
