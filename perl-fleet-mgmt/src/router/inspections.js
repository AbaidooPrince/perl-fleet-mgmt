export default [
  {
    // ViewInspectionReport
    path: '/:userRouteID/inspections',
    name: 'InspectionList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/InspectionList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllInspections',
        userType: true,
        userStatus: true,
        classification: true,
        group: true,
        userRole: false,
        emailConfirmed: false
      }
    }
  },
  {
    path: '/:userRouteID/inspection/report/:inspectionId',
    name: 'ViewInspectionReport',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/inspections/InspectionReport.vue'),
    meta: {
      layout: 'user',
      filter: {
      }
    }
  },
  {
    path: '/:userRouteID/inspections/new',
    name: 'NewInspection',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/NewInspection.vue'),
    meta: {
      layout: 'user',
      filter: {
      }
    }
  },
  {
    path: '/:userRouteID/inspections/:inspectionId/edit',
    name: 'EditInspection',
    props: {
      editMode: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/NewInspection.vue'),
    meta: {
      layout: 'user',
      filter: {
      }
    }
  }
]
