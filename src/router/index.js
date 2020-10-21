import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
      admin: false
    },
    path: '/',
    name: 'home',
    admin: false,
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      title: 'Tables',
      admin: false
    },
    path: '/tables',
    name: 'tables',
    admin: false,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms',
      admin: false
    },
    path: '/forms',
    name: 'forms',
    admin: false,
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile',
      admin: false
    },
    path: '/profile',
    name: 'profile',
    admin: false,
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'New Client',
      admin: false
    },
    path: '/client/new',
    name: 'client.new',

    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit Client',
      admin: false
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/ClientForm.vue'),
    props: true
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard Admin',
      admin: true
    },
    path: '/admin',
    name: 'Hospitales admin',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/TablesHospitales.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard Admin',
      admin: true
    },
    path: '/admin/doctores',
    name: 'Doctores admin',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/TablesDoctors.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'New Hospital',
      admin: true
    },
    path: '/admin/hospital/new',
    name: 'hospital.new',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/HospitalForm.vue')
  },
  {
    meta: {
      title: 'Edit Hospital',
      admin: true
    },
    path: '/hospital/:id',
    name: 'hospital.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/admin/HospitalForm.vue'),
    props: true
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'New Doctor',
      admin: true
    },
    path: '/admin/doctor/new',
    name: 'doctor.new',
    component: () => import(/* webpackChunkName: "tables" */ '../views/admin/DoctorForm.vue')
  },
  {
    meta: {
      title: 'Edit Doctor',
      admin: true
    },
    path: '/doctor/:id',
    name: 'doctor.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/admin/DoctorForm.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
