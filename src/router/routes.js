
const routes = [
  {
    path: '/',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/course/:id',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Course.vue') }
    ]
  },
  {
    path: '/teacher/:id',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: '', component: () => import('pages/Teacher.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/Header.vue'),
    children: [
      { path: 'courses', component: () => import('pages/CoursesUser.vue') },
      { path: 'timeline', component: () => import('pages/Timeline.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
