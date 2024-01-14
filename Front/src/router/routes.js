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
      { path: '/users/:id', component: () => import('pages/users/Edit.vue') }
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
