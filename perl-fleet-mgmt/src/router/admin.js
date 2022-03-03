export default [
  {
    path: '/:userRouteID/admin/account',
    name: 'AdminHome',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageUnderConstruction.vue'),
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/:userRouteID/admin/profile',
    name: 'AdminProfile',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue'),
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/:userRouteID/admin/vehicle-status',
    name: 'VehicleStatus',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/vehicles/VehicleStatus.vue'),
    meta: {
      layout: 'admin'
    }
  },
  {
    path: '/:userRouteID/admin/groups',
    name: 'Groups',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Groups.vue'),
    meta: {
      layout: 'admin'
    }
  }
]
