export default [
  {
    path: '/:userRouteID/admin/account',
    name: 'AdminHome',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/layouts/AdminUserLayout.vue'),
    meta: {
      layout: 'admin'
    }
  }
]
