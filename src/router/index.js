import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "FirstPage",
    component: () => import("@/pages/FirstPage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/pages/LoginPage.vue"),
  },

  // -----------------------

  {
    path: '/parties',
    children: [
      {
        path: '',
        name: 'PartiesPage',
        component: () => import('@/pages/PartiesPage.vue')
      },
      {
        path: '/create',
        name: 'CreateParty',
        component: () => import('@/pages/CreateParty.vue')
      },
      {
        path: '/PartyDetails/:fabSid',
        name: 'PartyDetail',
        component: () => import('@/pages/PartyDetails.vue')
      },
    ]
  },
  {
    path: "/stocks",
    children: [
      {
        path: "",
        name: "MyStocks",
        component: () => import('@/pages/MyStocks.vue'),
      },
      {
        path: ":stock_sid",
        name: "MyStockDetail",
        component: () => import('@/pages/MyStockDetail.vue'),
      },
      {
        path: ":stock_sid/:ledger_sid",
        name: "MyStockLedger",
        component: () => import('@/pages/MyStockLedger.vue'),
      },
    ]
  },
  {
    path: '/orders',
    children: [
      {
        path: '',
        name: 'FilteredOrders',
        component: () => import('@/pages/OrdersPage.vue')
      },
    ]
  },
  {
    path: '/incoming-orders',
    children: [
      {
        path: '',
        name: 'IncomingOrders',
        component: () => import('@/pages/IncomingOrder.vue')
      },
    ]
  },
  {
    path: '/purchase',
    children: [
      {
        path: '',
        name: 'Purchase',
        component: () => import('@/pages/PurchasePage.vue')
      },
    ]
  },


  // {
  //   path: "/stock-market",
  //   children: [
  //     {
  //       path: "",
  //       name: "StockMarket",
  //       component: () => import('@/pages/StockMarket.vue'),
  //     },
  //     {
  //       path: ":stock_sid",
  //       name: "StockMarketDetail",
  //       component: () => import('@/pages/StockMarketDetail.vue'),
  //     },
  //   ]
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
