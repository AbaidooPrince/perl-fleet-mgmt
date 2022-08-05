export default [{
  path: '/:userRouteID/issues',
  props: true,
  name: 'AllIssuesList',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/AllIssuesList.vue'),
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
  path: '/:userRouteID/issues/open',
  props: true,
  name: 'IssuesList',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/IssuesList.vue'),
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
  path: '/:userRouteID/issues/overdue',
  props: true,
  name: 'OverdueIssuesList',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/OverdueIssuesList.vue'),
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
  path: '/:userRouteID/issues/resolved',
  props: true,
  name: 'ResolvedIssuesList',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/ResolvedIssuesList.vue'),
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
  path: '/:userRouteID/issues/closed',
  props: true,
  name: 'ClosedIssueList',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/ClosedIssuesList.vue'),
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
  path: '/:userRouteID/issues/new',
  props: true,
  name: 'NewIssue',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "service" */ '../views/issues/NewIssue.vue'),
  meta: {
    layout: 'user'
  },
  children: []
}
]
