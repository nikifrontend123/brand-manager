import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "FirstPage",
    component: () => import("../views/FirstPage/FirstPage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/auth/LoginPage.vue"),
  },
  {
    path: "/Registration",
    name: "Registration",
    component: () => import("../views/auth/RegistrationPage.vue"),
  },
  {
    path: "/Catalog",
    name: "CataloPage",
    component: () => import("../views/store/CatalogPage.vue"),
  },
  {
    path: '/Market',
    name: 'Market',
    component: () => import('@/views/store/MarketPage.vue')
  },
  {
    path: '/MarketDetails/:sid',
    name: 'MarketDetails',
    component: () => import('@/views/store/MarketDetails.vue')
  },
  {
    path: '/Catalog',
    name: 'Catalog',
    component: () => import('@/views/store/CatalogPage.vue')
  },
  {
    path: '/CatalogDetails/:productId',
    name: 'CatalogDetails',
    component: () => import('@/views/store/CatalogDetails.vue')
  },
  {
    path: '/CatalogSku',
    name: 'CatalogSku',
    component: () => import('@/views/store/CatalogSku.vue')
  },
  {
    // path: '/ledger/:productId',
    path: '/ledger',
    name: 'ledger',
    component: () => import('@/views/store/LedgerPage.vue')
  },
  {
    path: '/PartyPage',
    name: 'Party',
    component: () => import('@/views/party/PartyPage.vue')
  },
  {
    path: '/CreateParty',
    name: 'CreateParty',
    component: () => import('@/views/party/CreateParty.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
