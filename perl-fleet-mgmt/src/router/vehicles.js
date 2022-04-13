export default [

  {
    path: '/:userRouteID/vehicles',
    name: 'VehicleList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllVehicles',
        vehicleType: true,
        vehicleGroup: true,
        vehicleStatus: true
      }
    }
  },
  {
    path: '/:userRouteID/unassigned-vehicles',
    name: 'UnassignedVehicles',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/UnassignedVehicles.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllUnassignedVehicles',
        vehicleType: true,
        vehicleGroup: true,
        vehicleStatus: true
      }
    }
  },
  {
    path: '/:userRouteID/assigned-vehicles',
    name: 'AssignedVehicles',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllAssignedVehicles',
        vehicleType: true,
        vehicleGroup: true,
        vehicleStatus: true
      }
    }
  },
  {
    path: '/:userRouteID/archived-vehicles',
    name: 'ArchivedVehicles',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/ArchivedVehiclesList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllArchivedVehicles',
        vehicleType: true,
        vehicleGroup: true,
        vehicleStatus: true
      }
    }
  },
  {
    path: '/:userRouteID/vehicles/assignments',
    name: 'VehicleAssignmentList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleAssignmentList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllVehicleAssignments',
        vehicleType: false,
        vehicleGroup: false,
        vehicleStatus: false
      }
    }
  },
  {
    path: '/:userRouteID/vehicles/new',
    props: {
      editMode: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/NewVehicle.vue'),
    meta: {
      layout: 'user'
    },
    children: [
      {
        path: '',
        name: 'NewVehicle',
        props: {
          editMode: false
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleDetails.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'maintenace',
        name: 'Maintenance',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleMaintenance.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'specifications',
        name: 'Specifications',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleSpecifications.vue'),
        meta: {
          layout: 'user'
        }
      }
    ]
  },
  {
    path: '/:userRouteID/vehicles/:vehicleID',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/ViewVehicle.vue'),
    meta: {
      layout: 'user'
    },
    children: [
      {
        path: '',
        props: true,
        name: 'Overview',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleOverview.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'photos',
        props: true,
        name: 'VehiclePhotos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehiclePhotos.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'documents',
        props: true,
        name: 'VehicleDocuments',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleDocuments.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'comments',
        props: true,
        name: 'VehicleComments',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleComments.vue'),
        meta: {
          layout: 'user'
        }
      }

    ]
  },
  {
    path: '/:userRouteID/vehicles/edit/:vehicleID',
    props: {
      editMode: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/NewVehicle.vue'),
    meta: {
      layout: 'user'
    },
    children: [
      {
        path: '',
        name: 'EditVehicleDetails',
        props: {
          editMode: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleDetails.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'maintenace',
        name: 'EditVehicleMaintenance',
        props: {
          editMode: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleMaintenance.vue'),
        meta: {
          layout: 'user'
        }
      },
      {
        path: 'specifications',
        name: 'EditVehicleSpecifications',
        props: {
          editMode: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/vehicles/VehicleSpecifications.vue'),
        meta: {
          layout: 'user'
        }
      }
    ]
  }
]
