export default [
  {
    path: '/:userRouteID/dashboard',
    name: 'UserDashboard',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/vehicles',
    name: 'VehicleList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleList.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/personnel',
    name: 'PersonnelList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/PersonnelList.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/personnel/new',
    name: 'NewPersonnel',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/NewPersonnel.vue'),
    meta: {
      layout: 'user'
    }
  }
]
