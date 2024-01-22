import verifyToken from 'src/middleware/auth';
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // beforeEnter: verifyToken,
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/users', component: () => import('pages/users/Index.vue') },
      { path: '/users/new', component: () => import('pages/users/New.vue') },
      { path: '/users/:id', component: () => import('pages/users/Edit.vue') },
      { path: '/types', component: () => import('pages/types/Index.vue') },
      { path: '/types/new', component: () => import('pages/types/New.vue') },
      { path: '/types/:id', component: () => import('pages/types/Edit.vue') },
      { path: '/rooms', component: () => import('pages/rooms/Index.vue') },
      { path: '/rooms/new', component: () => import('pages/rooms/New.vue') },
      { path: '/rooms/:id', component: () => import('pages/rooms/Edit.vue') },
      { path: '/priceRooms', component: () => import('pages/PriceRooms/Index.vue') },
      { path: '/priceRooms/:id', component: () => import('pages/PriceRooms/Edit.vue') },
      { path: '/priceRooms/new', component: () => import('pages/PriceRooms/New.vue') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('pages/Login.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
