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
