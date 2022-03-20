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
        props: true,
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
  },
  {
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
    path: '/:userRouteID/personnel',
    name: 'PersonnelList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/PersonnelList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllPersonnel',
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
    path: '/:userRouteID/personnel/users',
    name: 'UsersList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/UsersList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllUsers',
        userType: true,
        userStatus: true,
        classification: false,
        group: true,
        userRole: false,
        emailConfirmed: true
      }
    }
  },
  {
    path: '/:userRouteID/personnel/non-access',
    name: 'NonAccessList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/PersonnelList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllNonAccessUsers',
        userType: false,
        userStatus: false,
        classification: true,
        group: true,
        userRole: false,
        emailConfirmed: false
      }
    }
  },
  {
    path: '/:userRouteID/personnel/archived',
    name: 'ArchivedUsersList',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/PersonnelList.vue'),
    meta: {
      layout: 'user',
      filter: {
        dispatch: 'getAllArchivedUsers',
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
  },
  {
    path: '/:userRouteID/personnel/:userID/edit',
    name: 'EditPersonnel',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/EditPersonnel.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/personnel/:userID',
    name: 'ViewPersonnel',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personnel/ViewPersonnel.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/user/profile',
    name: 'UserProfile',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue'),
    meta: {
      layout: 'user'
    }
  },
  {
    path: '/:userRouteID/reset-password',
    name: 'ChangePassword',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/PasswordSetting.vue'),
    meta: {
      layout: 'user'
    }
  }
]
