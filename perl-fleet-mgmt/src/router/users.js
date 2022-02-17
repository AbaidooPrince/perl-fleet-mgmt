export default [
  {
    path: '/:userID/dashboard',
    name: 'UserDashboard',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/layouts/RegularUserLayout.vue')
  }
]
