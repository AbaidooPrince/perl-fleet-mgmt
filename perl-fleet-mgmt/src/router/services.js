export default [
  {
    path: '/:userRouteID/services',
    props: true,
    name: 'ServiceList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "service" */ '../views/service/ServiceList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllServices',
        vehicleType: true,
        vehicleGroup: true,
        vehicleStatus: true
      }
    },
    children: []
  },
  {
    path: '/:userRouteID/services/new',
    props: true,
    name: 'NewService',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "service" */ '../views/service/NewService.vue'),
    meta: {
      layout: 'user'
    },
    children: []
  }
]
